'use strict';

const base64 = require('base-64');
const Users = require('../models/users-model');

module.exports = async (req, res, next) => {
  try {
    // get the encoded credentials pairs
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');

    const user = await Users.findOne({ username: username });
    const valid = await user.isAuthenticate(password);
    if (valid) {
      req.user = user;
      next();
    } else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    authError();
    
  }

  function authError() {
    res.status(403).send('Invalid Login');
  }
};
