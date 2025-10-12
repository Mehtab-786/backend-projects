const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address:{
        type:String,
        trim:true
    },
    role:{
        type:String,
        enum:['Admin','User', 'Guest']
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;