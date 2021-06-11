const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

dotenv.config({path: './config.env'});

// connecting with cloud db
require('./db/conn');

app.use(express.json());  // to recognise the incoming req obj as JSON obj

app.use(require('./router/auth'));

const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`listening to port ${port}`)
});