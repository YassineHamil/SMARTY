const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
  name: String,
  company_id: { type: Schema.Types.ObjectId, ref: 'Company' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Machine', MachineSchema); 