require('dotenv').config()
const express = require('express')
const songRouter = require('./routes/song.routes')

const app = express()

app.use(express.json())

app.use('/api/song',songRouter)


module.exports = app