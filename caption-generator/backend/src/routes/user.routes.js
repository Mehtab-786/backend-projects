const express = require('express')
const userController = require('../controllers/user.controllers')
const userAuth = require('../middlewares/userAuth.middlewares')

const userRouter = express.Router()

userRouter.post('/register', userController.register)

userRouter.post('/login', userController.login)

module.exports = userRouter