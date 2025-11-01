import {Router} from 'express';
import {User} from '../models/UserModel.models.js'

const router = Router();

router.route('/register').post(async (req,res) => {
    const {username, email, password} = req.body;

    const isUser = await User.findOne({email});

    if(isUser){
        return res.status(401).json({
            message:"User already exists !",
            isUser,
        })
    };

    const user = await User.create({username, email, password})
        


    return res.status(200).send('hello')
    
})


export default router;