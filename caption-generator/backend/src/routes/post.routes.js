const express = require('express')
const userAuth = require('../middlewares/userAuth.middlewares')
const multer = require('multer')
const postModel = require('../models/post.models')
const { generateContent } = require('../services/ai.services')
const imageUpload = require('../services/storage.services')

const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()

postRouter.post('/',
    userAuth,
    upload.single('image'),
    async (req, res) => {
        const file = req.file.buffer
        const base64Image = file.toString('base64')

        const [imageData, resp] =await Promise.all([
            imageUpload(file),
            generateContent(base64Image)
        ])

        const post = await postModel.create({
            caption: resp,
            userId: req.user._id,
            image: imageData.url
        })
        return res.json({
            message: "Post created successfully ",
            post
        })

    }
)


module.exports = postRouter