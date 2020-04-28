const express = require('express');
const userModel = require('../models/user');
const jwtVerify = require('../utils/jwtVerify');

const router = express.Router();

router.post('/getTasks', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const userMongoId = await jwtVerify(token);
        if(!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }

        const user = await userModel.findById(userMongoId);
        return res.json({
            status: 200,
            message: 'Tasks received successfully!',
            tasks: user.tasks
        });

    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!!'
        });
    }
});



router.post('/addTask', async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const userMongoId = await jwtVerify(token);
        if(!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }
        const timestamp = new Date().getTime().toString();

        const updatedUser = await userModel.findByIdAndUpdate(userMongoId, {
            $push: {
                tasks: {
                    title: title,
                    description: description,
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



router.post('/deleteTask', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const userMongoId = await jwtVerify(token);
        if(!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }
        const timestamp = req.body.timestamp;
        if(!userMongoId){
            return res.json({
                status: 403,
                message: 'User id missing!!'
            });
        }
        if(!timestamp){
            return res.json({
                status: 403,
                message: 'Timestamp missing!!'
            });
        }
        
        const updatedUser = await userModel.findByIdAndUpdate(userMongoId,{
            $pull: {
                tasks: {
                    timestamp: timestamp
                }
            }
        });
        
        if(updatedUser){
            return res.json({
                status: 200,
                message: 'Task deleted successfully!!'
            });
        }
        else{
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