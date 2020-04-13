const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let { port } = require('./config');
const connectDB = require('./db/mongoose_connection');

const app = express();

//db
connectDB();


//middlewares
app.use(bodyParser.urlencoded({extended: true}));


port = process.env.PORT || port;
app.listen(port, ()=>{
    console.log(`Server running on port ${port} ...`);
});