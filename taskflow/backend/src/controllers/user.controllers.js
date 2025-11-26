import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({
            message: "No credentials provided"
        });
    };

    const ifUserExist = await UserModel.findOne({ email });

    if (ifUserExist) {
        return res.status(400).json({
            message: "User already Exists !"
        });
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ username, email, password: hashedPassword });

    if (!user) {
        return res.status(500).json({
            message: "Internal Server error"
        });
    };

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);




    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
        message: "User registered successfully ",
        user,
        token
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "No credentials provided"
        });
    };

    const user = await UserModel.findOne({ email }).select("-createdAt -updatedAt -__v ");

    if (!user) {
        return res.status(400).json({
            message: "Email or password invalid !"
        });
    };

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        return res.status(400).json({
            message: "Email or password invalid"
        });
    };

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
        message: "User Logged In successfully ",
        user,
        token
    });
};

const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });

    return res.status(200).json({
        message: "Logged out successfully",
    });

};

export { loginUser, registerUser, logoutUser };