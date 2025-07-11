const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  firstname: String,
  email: { type: String, unique: true },
  password: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema); 