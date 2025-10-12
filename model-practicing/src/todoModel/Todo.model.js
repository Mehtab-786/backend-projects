const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    subtodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubTodo'
        }
    ],
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000  // 7 days from now
    }

}, { timestamps: true })

const TodoModel = mongoose.model('Todo', TodoSchema)

module.exports = TodoModel