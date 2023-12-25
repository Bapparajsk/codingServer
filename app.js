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
app.use('/api/user', require('./routes/user'));
app.use('/api/problem', require('./routes/problem'));
app.use('/api/problem/image', require('./routes/imageRetrieval'));
app.use('/api/all-problems', require('./routes/getAllProblems'));
module.exports = app;
