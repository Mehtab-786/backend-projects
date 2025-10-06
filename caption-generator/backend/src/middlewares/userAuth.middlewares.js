const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');

async function userAuth(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: "User not authenticated !"
        });
    }

    try {
        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(tokenVerify.userId)
        req.user = user
        next()
    } catch (err) {
        console.log("Authentication error :: ", err)
    }
}

module.exports = userAuth