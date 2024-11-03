const mongoose = require('mongoose');

const testMetricSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  department: { type: String, required: true },
  timeIntervalStat: { type: Number, required: true },
  halfTime: { type: Number, required: true },
  breakTime: { type: Number, required: true },
  charactersTyped: { type: Number, required: true },
  mistakes: { type: Number, required: true },
  firstHalf: {
    charactersTyped: { type: Number, required: true },
    mistakes: { type: Number, required: true },
    timeSpent: { type: Number, required: true }
  },
  secondHalf: {
    charactersTyped: { type: Number, required: true },
    mistakes: { type: Number, required: true },
    timeSpent: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestMetric', testMetricSchema);