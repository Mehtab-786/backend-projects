import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["Pending", "Processing","Delivered"],
        default:"Pending"
    },
    totalBill:{
        type:Number,
        required:true,
        min:0
    },
    products:[
        {
            product:{
                type:Schema.Types.ObjectId,
            ref:"Product",
            required:true
            },
            quantity:{
                type:Number,
                min:0,
                required:true
            }
        }
    ],
    orderAt:{
        type:Date,
        default:Date.now
    }
    // shippingAddress:{}
}, {
    timestamps: true
});

export const orderModel = model('Order', orderSchema);

