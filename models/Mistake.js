const mongoose = require('mongoose');

const mistakeSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  first: {
    type: Number,
    required: true
  },
  second: {
    type: Number,
    required: true
  },
  third: {
    type: Number,
    required: true
  },
  fourth: {
    type: Number,
    required: true
  },
  fifth: {
    type: Number,
    required: true
  },
  sixth: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mistake', mistakeSchema);