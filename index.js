const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
let { port } = require('./config');
const connectDB = require('./db/mongoose_connection');

//routes handler
const authenticate = require('./routes/authenticate');
const profile = require('./routes/profile');
const task = require('./routes/task');
const expense = require('./routes/expense');

const app = express();

//db
connectDB();


//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/authenticate', authenticate);
app.use('/api/profile', profile);
app.use('/api/task', task);
app.use('/api/expense', expense);



port = process.env.PORT || port;
app.listen(port, ()=>{
    console.log(`Server running on port ${port} ...`);
});