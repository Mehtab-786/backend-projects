import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim: true,
        minLength: 3
    },
    email:{
        type:String,
        required:[true, 'Email is required !'],
        unique:true,
        trim: true,
        lowercase: true
    },
    password:{
        type:String,
        required:[true, 'Password is required !'],
    }
}, {
    timestamps:true
});

export const User = model('User',userSchema);