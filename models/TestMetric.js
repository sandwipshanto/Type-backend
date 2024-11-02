const express = require('express');
const router = express.Router();
const User = require('../models/User');
const TestMetric = require('../models/TestMetric');

// Create new user
router.post('/users', async (req, res) => {
  try {
    const { name, registrationNumber, department } = req.body;
    const user = new User({ name, registrationNumber, department });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Save test metrics
router.post('/metrics', async (req, res) => {
  try {
    const { userId, firstHalf, secondHalf, halfTime, breakTime } = req.body;
    const metric = new TestMetric({
      userId,
      firstHalf,
      secondHalf,
      halfTime,
      breakTime
    });
    await metric.save();
    res.status(201).json(metric);
  } catch (error) {
    console.error('Error saving metrics:', error);
    res.status(500).json({ message: 'Error saving metrics' });
  }
});

module.exports = router;