const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    content:{
        type:String,
        required:true
    }
}, {
    timestamps:true
})

const todoModel = mongoose.model('todo',todoSchema)

module.exports = todoModel