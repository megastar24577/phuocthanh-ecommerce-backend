require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const { countConnect } = require('./helpers/check.connect');
const app = express();

//init middlewares

//for logging
app.use(morgan('dev'));
//for hiding header
app.use(helmet());
//for compress response data
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
require('./dbs/init.mongodb');

//init routes
app.use('', require('./routes'));

//handling error
module.exports = app;
