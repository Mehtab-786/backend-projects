require('dotenv').config()
var cookieParser = require('cookie-parser')
const express = require('express')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)


module.exports = app