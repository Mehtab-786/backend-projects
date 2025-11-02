import { Router } from 'express';
import { authUser } from '../middlewares/authUser.middlewares.js';
const router = Router();

router.route('/').get(authUser,  (req,res) => {
    const {title} = req.body;

    res.send(title)
})


export default router;