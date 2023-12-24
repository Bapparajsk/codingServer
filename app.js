require('dotenv').config();
require('./db/usersDB');
require('./db/problemsDB')
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// app router path
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/problem', require('./routes/problem'));

module.exports = app;
