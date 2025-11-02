import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.models.js'

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.userId).select("-password")

        if (!user) {
            return res.status(401).json({
                message: 'User not found.'
            });
        };

        req.user = user
        next();
    } catch (error) {
        console.log("Invalid or expired token.", error);
        return res.status(401).json({
            message: 'Invalid or expired token.'
        });
    };

}
export { authUser }