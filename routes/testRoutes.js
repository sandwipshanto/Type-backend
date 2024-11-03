const express = require('express');
const router = express.Router();
const TestMetric = require('../models/TestMetric');

router.post('/', async (req, res) => {
  try {
    const {
      userId,
      name,
      registrationNumber,
      department,
      timeIntervalStat,
      halfTime,
      breakTime,
      charactersTyped,
      mistakes,
      firstHalf,
      secondHalf
    } = req.body;

    const testMetric = new TestMetric({
      userId,
      name,
      registrationNumber,
      department,
      timeIntervalStat,
      halfTime,
      breakTime,
      charactersTyped,
      mistakes,
      firstHalf: {
        charactersTyped: firstHalf.charactersTyped,
        mistakes: firstHalf.mistakes,
        timeSpent: firstHalf.timeSpent
      },
      secondHalf: {
        charactersTyped: secondHalf.charactersTyped,
        mistakes: secondHalf.mistakes,
        timeSpent: secondHalf.timeSpent
      }
    });

    const savedMetric = await testMetric.save();
    res.status(201).json(savedMetric);
  } catch (error) {
    console.error('Error saving test metric:', error);
    res.status(500).json({ 
      message: 'Error saving test metric', 
      error: error.message,
      details: error.errors
    });
  }
});

module.exports = router;