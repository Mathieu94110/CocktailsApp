const User = require('../database/models/user.model');

exports.findUserPerEmail = (email) => {
  return User.findOne({ 'email': email }).exec();
};

exports.findUserPerId = (id) => {
  return User.findById(id).exec();
};