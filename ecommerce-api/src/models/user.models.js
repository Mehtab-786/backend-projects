import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        index:true
    },
    password: {
        type: String,
        required: true,
        minLength:5
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default:"user"
    }
}, {
    timestamps: true
});

export const UserModel = model('User', userSchema);