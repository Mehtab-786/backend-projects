const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    disease:{
        type:String,
        required:true
    },
    medicines:[
        {
            name:{type:String,required:true},
            dosage:{type:Number,required:true}
        }
    ]
    ,doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
}, { timestamps: true })

const PrescriptionModel = mongoose.model('Prescription', PrescriptionSchema)

module.exports = PrescriptionModel