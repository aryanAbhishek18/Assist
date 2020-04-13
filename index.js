const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
let { port } = require('./config');
const connectDB = require('./db/mongoose_connection');
const authenticate = require('./routes/authenticate');

const app = express();

//db
connectDB();


//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/authenticate', authenticate);

port = process.env.PORT || port;
app.listen(port, ()=>{
    console.log(`Server running on port ${port} ...`);
});