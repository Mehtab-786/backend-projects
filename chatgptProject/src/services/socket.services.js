import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import cookie from 'cookie'
import { User } from "../models/UserModel.models.js";
import { generateContent } from "./ai.services.js";
import { Message } from "../models/messageModel.model.js";

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

            await Message.create({
                content: payload.message,
                role: "user",
                chat: payload.chat,
                user: socket.user._id
            });


            const chatHistory = await Message.find({ chat: payload.chat })

            // console.log('chat history  ,', chatHistory.map(item => {
            //     return {
            //         role: item.role,
            //         parts: [{ text: item.content }]
            //     }
            // }))


            const reply = await generateContent(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }));

            await Message.create({
                content: reply,
                role: "model",
                chat: payload.chat,
                user: socket.user._id
            });

            socket.emit("answer-replied", reply)

        })
    });
};

export { socketServer };