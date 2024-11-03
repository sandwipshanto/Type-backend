const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats');

// POST /api/stats - Create new stats entry
router.post('/', async (req, res) => {
  try {
    const {
      userRegNo,
      department,
      name,
      testHalfTime,
      testBreakTime,
      intervalTime,
      typingIntervals
    } = req.body;

    const newStats = new Stats({
      userRegNo,
      department,
      name,
      testHalfTime,
      testBreakTime,
      intervalTime,
      typingIntervals
    });

    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/stats - Get all stats
router.get('/', async (req, res) => {
  try {
    const stats = await Stats.find().sort({ createdAt: -1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;