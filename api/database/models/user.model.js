const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailToken: { type: String },
  emailVerified: { type: Boolean }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;