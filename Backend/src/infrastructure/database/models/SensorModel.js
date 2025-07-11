const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorSchema = new Schema({
  sensor_id: String,
  name: String,
  machine_id: { type: Schema.Types.ObjectId, ref: 'Machine' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sensor', SensorSchema); 