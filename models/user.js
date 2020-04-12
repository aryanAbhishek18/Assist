const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: 'No description!'
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
    tasks: [taskSchema]
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;