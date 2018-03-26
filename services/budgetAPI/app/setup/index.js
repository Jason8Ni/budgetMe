const mongoose = require('mongoose'),
      UserModel = require('@Models/User');

const models = {
  User: mongoose.model('User')
}
module.exports = models;