require('dotenv').config()
const cors = require('cors')
const express = require('express')
const songRouter = require('./routes/song.routes')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/song', songRouter)


module.exports = app