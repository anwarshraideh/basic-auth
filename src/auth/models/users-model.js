'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});


usersSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});


usersSchema.methods.isAuthenticate = function (password) {
  return bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('users', usersSchema);


