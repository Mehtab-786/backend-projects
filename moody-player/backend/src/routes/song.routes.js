const express = require('express')
const multer = require('multer')
const songModel = require('../models/song.model')
const songUpload = require('../services/storage.services')
const upload = multer({ storage: multer.memoryStorage() })

const songRouter = express.Router()

songRouter.post('/post', upload.single('audio'), async (req, res) => {

    const song = await songUpload(req.file)

    const resp = await songModel.create({
        name: req.body.name,
        mood: req.body.mood,
        author: req.body.author,
        audio: song.url
    })

    res.json({
        message: "successfully uploaded",
        resp
    })
})

songRouter.get('/post', async (req, res) => {
    const mood = req.query.mood
    const songs = await songModel.findOne({ mood })
    res.json({
        message: 'songs found',
        songs
    })
})

songRouter.get('/allsongs', async (req, res) => {
    const allsongs = await songModel.find()
    res.json({
        message: 'all songs',
        allsongs
    })
})


module.exports = songRouter