// server/models/Text.js
const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Text', textSchema);




