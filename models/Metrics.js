const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstHalf: {
    intervals: [{
      timestamp: Number,
      charactersTyped: Number,
      mistakes: Number
    }],
    totalMistakes: Number,
    totalCharactersTyped: Number
  },
  secondHalf: {
    intervals: [{
      timestamp: Number,
      charactersTyped: Number,
      mistakes: Number
    }],
    totalMistakes: Number,
    totalCharactersTyped: Number
  },
  halfTime: Number,
  breakTime: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Metrics', metricsSchema);