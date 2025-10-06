const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')

async function register(req, res) {
    const { username, email, password } = req.body

    const isUser = await userModel.findOne({ email })

    if (isUser) {
        return res.status(409).json({
            message: "user already exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const user = await userModel.create({
        username,
        password: hashedPassword,
        email
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: true
    })

    return res.status(201).json({
        message: 'User register succesfully',
        user
    })

}

async function login(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "Invalid Credentials!"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if (!isPassword) {
        return res.status(404).json({
            message: "Invalid Credentials!"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

    res.cookie('token', token)

    res.status(200).json({
        message: "User logged in ",
        user
    })
}


module.exports = {register, login}