const express = require('express');
const app = express();

const dotenv = require('dotenv')

//-----------using middleware------------
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// ---------importing routes-----------
const post = require('./routes/post');
const user = require('./routes/user');

// --------using routes---------
app.use('/api/v1', post);
app.use('/api/v1', user);

dotenv.config({path:"./config/config.env"})
module.exports = app;