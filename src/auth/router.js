'use strict';


const express = require('express');
const router = express.Router();

const basicAuth = require('./middleware/basic');
const Users = require('./models/users-model');

router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);

async function signUp(req, res, next) {
  try {
    const user = new Users(req.body);
    const record = await user.save();
    res.status(201).json(record);
  } catch(e) {
    next(e.message);
  }
}

function signIn(req, res, next) {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = router;