const express = require('express');
const router = express.Router();
const Metrics = require('../models/Metrics');

router.post('/', async (req, res) => {
  console.dir(req.body, { depth: Infinity })
  try {
    const { userId, firstHalf, secondHalf, halfTime, breakTime } = req.body;

    const metrics = new Metrics({
      userId,
      firstHalf,
      secondHalf,
      halfTime,
      breakTime
    });

    await metrics.save();
    res.status(201).json({ message: 'Metrics saved successfully', metrics });
  } catch (error) {
    console.error('Error saving metrics:', error);
    res.status(500).json({ message: 'Error saving metrics', error: error.message });
  }
});

module.exports = router;