const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  halfTime: {
    type: Number,
    required: true,
    default: 300 // 5 minutes
  },
  breakTime: {
    type: Number,
    required: true,
    default: 60 // 1 minute
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);