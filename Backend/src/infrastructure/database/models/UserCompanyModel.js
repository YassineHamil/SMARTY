const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCompanySchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
  is_admin: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserCompany', UserCompanySchema); 