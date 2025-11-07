import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import cookie from 'cookie'
import { User } from "../models/UserModel.models.js";
import { generateContent, generateVectors } from "./ai.services.js";
import { Message } from "../models/messageModel.model.js";
import { createMemory, queryMemory } from '../services/vector.services.js'

async function socketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie);

        if (!cookies.token) {
            next(new Error('Access denied ! No token provided'))
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.userId)
            socket.user = user
            next()
        } catch (error) {
            next(new Error('No token provided'))
        }

    })

    io.on("connection", (socket) => {
        console.log("socket connected ::", socket.id)

        socket.on("question-asked", async (payload) => {

            const [userMessage, userVectors] = await Promise.all([
                await Message.create({
                    content: payload.message,
                    role: "user",
                    chat: payload.chat,
                    user: socket.user._id
                }),
                await generateVectors(payload.message)
            ]);

            await createMemory({
                messageId: userMessage._id,
                vectors: userVectors,
                metadata: {
                    chat: payload.chat,
                    user: socket.user._id,
                    text: payload.message
                }
            })

            const MAX_TURNS = 5;

            const [memory, chatHistory] = await Promise.all([
                await queryMemory({
                    metadata: {
                        user: socket.user._id
                    },
                    queryVector: userVectors,
                    limit: 3
                }),
                await Message.find({ chat: payload.chat })
                    .select("role content createdAt")
                    .sort({ createdAt: -1 })
                    .limit(MAX_TURNS)
                    .lean()
            ])

            const stm = chatHistory.reverse().map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            });

            const ltm = [
                {
                    role: "user",
                    parts: [{
                        text: `these are some previous messages from the chat, use them to generate a response 
                        ${memory.map(item => item.metadata.text).join("\n")}
                        `
                    }]
                }
            ];

            const reply = await generateContent([...ltm, ...stm]);

            socket.emit("answer-replied", reply)

            const [aiVectors, aiMessage] = await Promise.all([
                await generateVectors(reply),
                await Message.create({
                    content: reply,
                    role: "model",
                    chat: payload.chat,
                    user: socket.user._id
                })
            ]);

            await createMemory({
                messageId: aiMessage._id,
                vectors: aiVectors,
                metadata: {
                    chat: payload.chat,
                    user: socket.user._id,
                    text: reply
                }
            });

        })
    });
};

export { socketServer };