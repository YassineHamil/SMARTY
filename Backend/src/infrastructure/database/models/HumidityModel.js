const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HumiditySchema = new Schema({
  humidity: Number,
  sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
  event_time: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Humidity', HumiditySchema); 