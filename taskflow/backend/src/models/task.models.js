import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    completed: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const taskModel = model('Task', taskSchema);