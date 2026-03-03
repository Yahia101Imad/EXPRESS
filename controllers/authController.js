// IMPORT PACKAGES
const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const jwt = require('jsonwebtoken')

const signup = asyncErrorHandler(async (req, res) => {
    const newUser = await User.create(req.body)

    const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR, {
        expiresIn: process.env.EXPIRED_IN
    })

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})

module.exports = {signup}