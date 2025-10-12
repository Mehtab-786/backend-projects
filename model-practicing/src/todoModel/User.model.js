const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type:String,
        enum:['Admin', 'User', 'Guest'],
        default:'User'
    }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel