const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: String,
    audio: {
        type: String,
        required: true
    },
    mood : String

}, {
    timestamps: true
})

const songModel = mongoose.model('song', songSchema)

module.exports = songModel