const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    orderPrice: {
        type: Number,
        required: true,
    },
    OrderItem:{
        type:Number,
        required:true,
        min:1
    }
}, {
    timestamps: true
});

const OrderItemModel = mongoose.model('OrderItem', OrderItemSchema);

module.exports = OrderItemModel;