const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemperatureSchema = new Schema({
  temperature: Number,
  sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
  event_time: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Temperature', TemperatureSchema); 