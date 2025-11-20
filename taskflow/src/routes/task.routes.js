import { Router } from 'express';
import { taskModel } from '../models/task.models.js';
import mongoose from 'mongoose';

const routes = Router();

routes.post('/', async (req, res) => {
    try {
        const { task } = req.body;

        if (!task || task.length <= 2) {
            return res.status(400).json({
                message: 'Task is required or task is too short'
            });
        };

        const resp = await taskModel.create({
            task,
            completed: false
        })

        return res.status(201).json({
            message: 'Task created successfully',
            resp
        });
    } catch (error) {
        console.log('Error while creating task :: ', error)
    }
});

routes.get('/tasks', async (req, res) => {
    const tasks = await taskModel.find().select("-createdAt -updatedAt -__v -_id");

    return res.status(200).json({
        message: "All task",
        tasks
    })

})

routes.delete('/delete/:id', async (req, res) => {
    try {
        const params = req?.params?.id

        if (!mongoose.isValidObjectId(params)) {
            return res.status(400).json({
                message: 'Not valid id'
            })
        }

        await taskModel.findByIdAndDelete(params)

        return res.status(200).json({
            message: "Task deleted succesfully"
        });
    } catch (error) {
        console.log('Valid Id not provided')
        return;
    }
});

routes.patch('/update/:id', async (req, res) => {
    const params = req?.params?.id;
    const { task } = req.body;

    const taskEdited = await taskModel.findByIdAndUpdate(params, { task }, { new: true });

    res.status(200).json({
        message: 'Task updated successfully',
        taskEdited
    });

})

export default routes;