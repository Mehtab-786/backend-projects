import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
}, {
    timestamps:true
})

const categoryModel = model('Category', categorySchema)


const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    stock: {
        type: Number,
        required: true,
        min:0
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
}, {
    timestamps: true
});

export const productModel = model('Product', productSchema);

