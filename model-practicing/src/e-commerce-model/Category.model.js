const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true,
        trim:true
    }
}, {
    timestamps: true
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;