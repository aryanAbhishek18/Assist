const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { port, mongoURL } = require('./config');

const app = express();

//db
const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};
mongoose.connect(mongoURL, db_options);
mongoose.connection.once('open', function () {
    console.log("Database connection opened");
});

mongoose.connection.on('error', function (error) {
    console.log("Database connection error");
});

mongoose.connection.on('reconnected', function () {
    console.log("Database reconnected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Database disconnected");
    mongoose.connect(config.url, { useNewUrlParser: true });
});





//middlewares
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, ()=>{
    console.log(`Server running on port ${port} ...`);
});