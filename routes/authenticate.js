const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

const router = express.Router();

router.post('/signUp', async (req, res) => {
    try {
        console.log(req.body);
        
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        console.log(name + email + password); 

        const checkUser = await userModel.findOne({
            email: email
        });
        if (checkUser) {
            res.json({
                status: 409,
                message: 'This email is already in use!'
            });
        } else {
            // const salt = await bcrypt.genSalt(10);
            // const hashed_pass = await bcrypt.hash(password, salt);

            const newUser = await userModel.create({
                name: name,
                email: email,
                password: password
            });

            console.log(newUser + 'created!');
            res.json({
                status: 200,
                message: 'Sign Up successful!',
                userMongoId: newUser._id
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


router.post('/signIn', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const checkUser = await userModel.findOne({
            email: email,
            password: password
        });
        if (!checkUser) {
            res.json({
                status: 403,
                message: 'Wrong credentials!'
            });
        } else {
            // const passVerified = await bcrypt.compare(password, checkUser.password);

            // if (passVerified) {
            //     console.log(checkUser + 'found!');
            //     res.json({
            //         status: 200,
            //         message: 'Sign In successful!',
            //         userMongoId: checkUser._id
            //     });
            // } else {
            //     console.log('Sign In failed!');
            //     res.json({
            //         status: 200,
            //         message: 'Check the password provided!'
            //     });
            // }

            console.log(checkUser + 'found!');
            res.json({
                status: 200,
                message: 'Sign In successful!',
                userMongoId: checkUser._id
            });
        }

    } catch (e) {
        res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});

module.exports = router;