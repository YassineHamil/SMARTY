const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema); 