const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bcryptHash = require('../utils/bcyptHash');
const bcryptCompare = require('../utils/bcyptCompare');
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



// router.post('/signIn', async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         const checkUser = await userModel.findOne({
//             email: email,
//             password: password
//         });
//         if (!checkUser) {
//             res.json({
//                 status: 403,
//                 message: 'Wrong credentials!'
//             });
//         } else {
//             // const passVerified = await bcrypt.compare(password, checkUser.password);

//             // if (passVerified) {
//             //     console.log(checkUser + 'found!');
//             //     res.json({
//             //         status: 200,
//             //         message: 'Sign In successful!',
//             //         userMongoId: checkUser._id
//             //     });
//             // } else {
//             //     console.log('Sign In failed!');
//             //     res.json({
//             //         status: 200,
//             //         message: 'Check the password provided!'
//             //     });
//             // }

//             // console.log(checkUser + 'found!');
//             res.json({
//                 status: 200,
//                 message: 'Sign In successful!',
//                 userMongoId: checkUser._id
//             });
//         }

//     } catch (e) {
//         res.json({
//             status: 500,
//             message: 'Internal server error!'
//         });
//     }
// });



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