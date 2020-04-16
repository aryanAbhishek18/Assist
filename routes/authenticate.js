const express = require('express');
const bcryptHash = require('../utils/bcryptHash');
const bcryptCompare = require('../utils/bcryptCompare');
const userModel = require('../models/user');

const router = express.Router();



router.post('/signUp', async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const checkUser = await userModel.findOne({
            email: email
        });
        if (checkUser) {
            return res.json({
                status: 409,
                message: 'This email is already in use!'
            });
        } else {
            next();
        }
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
}, bcryptHash, async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const hashedPass = req.hashedPassword;

        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashedPass
        });

        return res.json({
            status: 200,
            message: 'Sign Up successful!',
            userMongoId: newUser._id
        });

    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});





router.post('/signIn', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const checkUser = await userModel.findOne({
            email: email
        });
        if (!checkUser) {
            return res.json({
                status: 403,
                message: 'Wrong credentials!'
            });
        } else {
            req.expectedUser = checkUser;
            next();
        }
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
}, bcryptCompare, async (req, res) => {
    try {
        const user = req.expectedUser;
        return res.json({
            status: 200,
            message: 'Sign In successful!',
            userMongoId: user._id
        });
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


module.exports = router;