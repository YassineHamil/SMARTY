const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovementSchema = new Schema({
  sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
  state: { type: String, enum: ['start-moving', 'stop-moving'] },
  event_time: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Movement', MovementSchema); 