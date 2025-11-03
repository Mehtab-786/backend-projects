import { model, Schema } from 'mongoose';

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    
    role:{
        type: String,
        enum:["user", "model"],
        default:"user"
    }
}, {
    timestamps: true
});

export const Message = model('Message', MessageSchema);