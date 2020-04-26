const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
let { port } = require('./config');
const connectDB = require('./db/mongoose_connection');

//routes handler
const controller = require('./routes/controller');

const app = express();

//db
connectDB();


//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/projects/assist', controller);



port = process.env.PORT || port;
app.listen(port, ()=>{
    console.log(`Server running on port ${port} ...`);
});