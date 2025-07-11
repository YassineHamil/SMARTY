const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductionCycleSchema = new Schema({
  machine_id: { type: Schema.Types.ObjectId, ref: 'Machine' },
  expected_end_date: Date,
  current_time: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('ProductionCycle', ProductionCycleSchema); 