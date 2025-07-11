const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PressureSchema = new Schema({
  pressure: Number,
  sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
  event_time: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Pressure', PressureSchema); 