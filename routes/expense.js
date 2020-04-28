const express = require('express');
const jwtVerify = require('../utils/jwtVerify');
const userModel = require('../models/user');

const router = express.Router();

router.post('/addCategory', async (req, res) => {
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

        const categoryName = req.body.categoryName;
        const updatedUser = await userModel.findByIdAndUpdate(userMongoId, {
            $push: {
                expenseCategories: {
                    categoryName: categoryName
                }
            }
        });

        return res.json({
            status: 200,
            message: 'Category added successfully!'
        });

    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


router.post('/getCategoriesAndExpenses', async (req, res) => {
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
        if (!user) {
            return res.json({
                status: 500,
                message: 'Internal server error!'
            });
        }

        return res.json({
            status: 200,
            message: 'User details fetched sucessfully!',
            categories: user.expenseCategories,
            expenses: user.expenses
        });

    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});



router.post('/addExpense', async (req, res) => {
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


        const user = await userModel.findByIdAndUpdate(userMongoId, {
            $push: {
                expenses: {
                    category: req.body.category,
                    amount: req.body.amount,
                    description: req.body.description,
                    created: req.body.created,
                    date: req.body.date,
                    month: req.body.month,
                    year: req.body.year
                }
            }
        });

        return res.json({
            status: 200,
            message: 'Expense saved successfully!'
        });
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


module.exports = router;