import { taskModel } from '../models/task.models.js';
import mongoose from 'mongoose';

async function taskCreate(req, res) {
    try {
        const { task } = req.body;
        const user = req.user;

        let taskAlreadyCreated = await taskModel.findOne({task:task,owner:user._id})

        if(taskAlreadyCreated){
            return res.status(400).json({
                message:"Task already created"
            })
        }

        if (!task || task.length <= 2) {
            return res.status(400).json({
                message: 'Task is required or task is too short'
            });
        };

        
        
        const resp = await taskModel.create({
            task,
            owner:user._id,
            completed: false
        });

        return res.status(201).json({
            message: 'Task created successfully',
            resp
        });
    } catch (error) {
        console.log('Error while creating task :: ', error)
    }
};

async function allTask(req, res) {

    const tasks = await taskModel.find({owner:req.user?._id}).select("-createdAt -updatedAt -__v ");

    
    return res.status(200).json({
        message: "All task",
        tasks
    });
};

async function deleteTask(req, res) {
    try {
        const params = req?.params?.id

        if (!mongoose.isValidObjectId(params)) {
            return res.status(400).json({
                message: 'Not valid id'
            })
        };
        await taskModel.findByIdAndDelete(params);

        return res.status(200).json({
            message: "Task deleted succesfully"
        });
    } catch (error) {
        console.log('Valid Id not provided')
        return;
    }
};


async function updateTask(req, res) {
    const params = req?.params?.id;
    const { task } = req.body;

    const taskEdited = await taskModel.findByIdAndUpdate(params, { task }, { new: true });

    res.status(200).json({
        message: 'Task updated successfully',
        taskEdited
    });
};

async function updateCompleted(req, res) {
    const params = req?.params?.id;
    const {completed} = req?.body;
    const taskUPdated = await taskModel.findByIdAndUpdate(params, {completed}, {new:true});
    
    res.status(200).json({
        message: 'Task Status changed',
        taskUPdated
    });
}
export {allTask, deleteTask, taskCreate, updateTask, updateCompleted};