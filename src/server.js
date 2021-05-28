'use strict';

const express = require('express');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const userRouter = require('./auth/router.js');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const multParse = multer();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1', userRouter);
app.use(morgan('dev'));
app.use(userRouter);
app.use(multParse.none());

app.use('*', notFound);
app.use(serverError);


const start = (port) => {
  app.listen(port, () => {
    console.log('The app is listening on PORT: ', port);
  });
};


module.exports = {
  app: app,
  start: start,
};

