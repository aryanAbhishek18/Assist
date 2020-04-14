const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

const router = express.Router();

router.post('/getProfile', async (req, res) => {
    try {
        const userMongoId = req.body.userMongoId;
        if (!userMongoId) {
            return res.json({
                status: 401,
                message: 'User Id missing!!'
            });
        }

        const user = await userModel.findById(userMongoId);
        if (!user) {
            return res.json({
                status: 401,
                message: 'Invalid user id!!'
            });
        }

        return res.json({
            status: 200,
            message: 'User found!',
            user: user
        });
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


router.post('/changePassword', async (req, res) => {
    const userMongoId = req.body.userMongoId;
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;

    if (!userMongoId) {
        return res.json({
            status: 401,
            message: 'User id missing!!'
        });
    }

    if (!oldPass) {
        return res.json({
            status: 401,
            message: 'Old password missing!!'
        });
    }

    if (!newPass) {
        return res.json({
            status: 401,
            message: 'New password missing!!'
        });
    }

    if (oldPass === newPass) {
        return res.json({
            status: 401,
            message: 'Old password and new one cant be same!!'
        })
    }

});


module.exports = router;