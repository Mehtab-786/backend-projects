const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    established: {
        type: Number,
        max: new Date().getFullYear()
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

const HospitalModel = mongoose.model('Hospital', HospitalSchema)

module.exports = HospitalModel