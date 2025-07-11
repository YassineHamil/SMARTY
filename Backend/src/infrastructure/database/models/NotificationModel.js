const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['invite', 'expulsion'] },
  description: String,
  company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
  is_view: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema); 