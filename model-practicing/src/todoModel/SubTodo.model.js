const mongoose = require('mongoose');

const SubTodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim:true,
                required: true
    },
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    complete :{
        type:Boolean,
        default:false
    },
    todo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    }
}, { timestamps: true })

const SubTodoModel = mongoose.model('SubTodo', SubTodoSchema)

module.exports = SubTodoModel