import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import cookie from 'cookie'
import { User } from "../models/UserModel.models";

async function socketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie);

        console.log(cookies)

        if (!cookies.token) {
            next(new Error('Access denied ! No token provided'))
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
            const user =  await User.findById(decoded.userId)
            socket.user = user
            next()
        } catch (error) {
            next(new Error('No token provided'))
        }

    })

    io.on("connection", (socket) => {
        console.log("socket connected ::", socket.id)
    });
};

export { socketServer };