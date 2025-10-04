const express = require('express')
const multer = require('multer')
const songModel = require('../models/song.model')
const songUpload = require('../services/storage.services')
const upload = multer({ storage: multer.memoryStorage() })


const songRouter = express.Router()

songRouter.post('/post', upload.single('audio'), async (req, res) => {

    // songModel.create({
    //     name: req.body.name,
    //     mood:req.body.mood,
    //     author:req.body.author,
    //     audio:
    // })
    console.log(req.file.buffer)
    console.log(req.file)
    const song = await songUpload(req.file)

    res.json({
        message:"success",
        song
    })
})

songRouter.get('/post', (req, res) => { })

songRouter.get('/allsongs', (req, res) => { })


module.exports = songRouter