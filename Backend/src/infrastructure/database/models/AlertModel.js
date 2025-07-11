const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
  alert_time: Date,
  cycle_id: { type: Schema.Types.ObjectId, ref: 'ProductionCycle' },
  is_view: { type: Boolean, default: false },
  type: { type: String, enum: ['machine_error', 'prod_end'] },
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Alert', AlertSchema); 