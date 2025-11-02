import { User } from '../models/UserModel.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required."
            });
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(409).json({
                message: "User already exists !"
            })
        };

        const saltRounds = Number(12);
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const user = await User.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

        res.cookie('token', token, {
            httpOnly: true
        })

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.log('Error while registering user ::', error)

        res.status(500).json({
            message: "Internal Server Error"
        })
    }

};

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email, and password are required."
            });
        }

        const isUserFound = await User.findOne({ email });

        if (!isUserFound) {
            return res.status(401).json({
                message: "Invalid Credentials !"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, isUserFound.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Credentials !"
            });
        }

        const token = jwt.sign({ userId: isUserFound._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

        res.cookie('token', token, {
            httpOnly: true
        })

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: isUserFound._id,
                username: isUserFound.username,
                email: isUserFound.email
            }
        })
    } catch (error) {
        console.log('Error while logging user :: ', error)
        return res.status(500).json({
            message: "Internal Server error"
        })
    }

};

export { registerUser, loginUser };