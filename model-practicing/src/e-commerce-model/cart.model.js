const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    item : [
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 1000
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        trim:true,
        unique: true
    }
}, {
    timestamps: true
});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;