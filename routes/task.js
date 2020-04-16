const express = require('express');
const userModel = require('../models/user');

const router = express.Router();

router.post('/addTask', async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.title;
        const userMongoId = req.body.userMongoId;
        const timestamp = new Date().getTime().toString();

        const updatedUser = await userModel.findByIdAndUpdate(userMongoId, {
            $push: {
                tasks: {
                    title: title,
                    desc: description,
                    timestamp: timestamp
                }
            }
        });

        if (updatedUser) {
            return res.json({
                status: 200,
                message: 'Task added successfully!!',
                timestamp: timestamp
            });
        } else {
            return res.json({
                status: 500,
                message: 'Internal server error!!'
            });
        }

    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!!'
        });
    }
});

module.exports = router;