import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export async function authUser(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const user = await UserModel.findById(decoded?.id).select("-password");
        if (!user) {
            // user not found (maybe deleted) -> reject
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error)
        return res.status(401).json({ message: "Invalid or expired token" });
    };
};