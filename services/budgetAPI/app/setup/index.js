const mongoose = require('mongoose'),
      UserModel = require('@Models/User'),
      ClientModel = require('@Models/Client');

const models = {
  User: mongoose.model('User'),
  Client: mongoose.model('Client')
}
module.exports = models;