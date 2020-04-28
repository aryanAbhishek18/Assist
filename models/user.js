const mongoose = require('mongoose');
const schema = mongoose.Schema;

const expenseCategorySchema = ({
    categoryName: {
        type: String
    }
});

const expenseSchema = ({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        unique: true
    },
    date:{
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const taskSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'No description!'
    },
    timestamp: {
        type: String,
        required: true,
        unique: true
    }
});

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [taskSchema],
        default: []
    },
    expenseCategories: {
        type: [expenseCategorySchema],
        default: []
    },
    expenses: {
        type: [expenseSchema],
        default: []
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;