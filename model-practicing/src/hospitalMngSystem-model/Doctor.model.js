const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
       enum: ['Cardiology', 'Neurology', 'Orthopedics', 'ENT', 'General'],
        required: true
    },
    salary:  {
        type: Number,
        min: 0
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        min: 0
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    hospitalWoking:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Hospital',
            required:true
        }
    ]
}, { timestamps: true })

const DoctorModel = mongoose.model('Doctor', DoctorSchema)

module.exports = DoctorModel