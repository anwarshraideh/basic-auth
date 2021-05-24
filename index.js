'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.start(PORT);
  })
  .catch((e) => {
    console.log('Could not start server', e.message);
  });

  