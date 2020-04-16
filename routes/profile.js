const express = require('express');
const userModel = require('../models/user');
const bcryptHash = require('../utils/bcryptHash');

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




router.post('/changePassword', async (req, res, next) => {
    try {
        const userMongoId = req.body.userMongoId;
        const newPass = req.body.password;
        if (!userMongoId) {
            return res.json({
                status: 401,
                message: 'User id missing!!'
            });
        }
        if (!newPass) {
            return res.json({
                status: 401,
                message: 'New password missing!!'
            });
        }
        next();
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal1 server error!!'
        });
    }
}, bcryptHash, async (req, res) => {
    try {
        const newHashedPassword = req.hashedPassword;
        const userMongoId = req.body.userMongoId;
        const updatedUser = await userModel.findOneAndUpdate({
            _id: userMongoId
        }, {
            password: newHashedPassword
        });
        if (updatedUser) {
            return res.json({
                status: 200,
                message: 'Password updated successfully!!'
            });
        } else {
            return res.json({
                status: 500,
                message: 'Internal2 server error!!'
            });
        }
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal3 server error!!'
        });
    }
});



module.exports = router;