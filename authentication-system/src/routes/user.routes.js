const express = require('express')
const userModel = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userAuth = require('../middlewares/userAuth.middlewares')

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
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

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET ,{expiresIn:'2d'})

    res.cookie('token', token, {
        httpOnly:true,
        sameSite:true
    })

    return res.status(201).json({
        message: 'User register succesfully',
        user
    })

})

userRouter.post('/login',async (req,res) => {

    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"Invalid Credentials!"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword){
        return res.status(404).json({
            message:"Invalid Credentials!"
        })
    }

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'2d'})

    res.cookie('token', token)
    
    res.status(200).json({
        message:"User logged in ",
        user
    })
})

userRouter.get('/', userAuth , (req,res) => {
    res.json({
        message:'User is authenticated'
    })
})

module.exports = userRouter