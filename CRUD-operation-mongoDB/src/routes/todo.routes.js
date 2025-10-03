const express = require('express')
const todoModel = require('../model/todo.model')

const todoRouter = express.Router()

todoRouter.get('/', async (req, res) => {
    const allTask = await todoModel.find()
    res.status(200).json({
        message: "All Tasks",
        allTask
    })
})

todoRouter.post('/add', async (req, res) => {
    const { title, content } = req.body

    const task = await todoModel.create({ title, content })

    return res.status(200).json({
        message: 'Task created successfully',
        task
    })
})

todoRouter.post('/delete', async (req, res) => {
    const { title } = req.body

    const task = await todoModel.findOneAndDelete({ title })

    return res.status(200).json({
        message: 'Task deleted successfully',
        task
    })
})

todoRouter.post('/update', async (req, res) => {
    const { title, content } = req.body

    const task = await todoModel.findOneAndUpdate({ title }, { content }, {new:true})

    return res.status(200).json({
        message: 'Task updated successfully',
        task
    })
})

module.exports = todoRouter