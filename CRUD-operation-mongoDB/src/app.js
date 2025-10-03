const express = require('express')
const todoRouter = require('./routes/todo.routes')

const app = express()

app.use(express.json())
    

app.use('/api/todo',todoRouter)

module.exports = app