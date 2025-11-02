import { Router } from 'express';
import { authUser } from '../middlewares/authUser.middlewares.js';
import { Chat } from '../models/chatModel.models.js';
const router = Router();

router.route('/').get(authUser, async (req, res) => {
    const { title } = req.body;

    const chat = await Chat.create({
        title,
        user: req.user?._id
    })

    if(!chat){
        return res.status(500).json({
            message :"Error while creating chat !"
        })
    }

    return res.status(200).json({
        message:"chat created successfully ",
        chat
    })
})


export default router;