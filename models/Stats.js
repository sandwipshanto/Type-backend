const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  userRegNo: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  testHalfTime: {
    type: Number,
    required: true
  },
  testBreakTime: {
    type: Number,
    required: true
  },
  intervalTime: {
    type: Number,
    required: true
  },
  typingIntervals: [{
    typedCharacters: {
      type: Number,
      required: true
    },
    mistakes: {
      type: Number,
      required: true
    }
  }]
})

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;