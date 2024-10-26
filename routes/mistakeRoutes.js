const express = require('express');
const router = express.Router();
const Mistake = require('../models/Mistake');

// Get all mistakes
router.get('/', async (req, res) => {
  try {
    const mistakes = await Mistake.find();
    res.json(mistakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new mistake entry
router.post('/mistakes', async (req, res) => {
  console.log('req received')
  const mistake = new Mistake({
    userId: req.body.userId || 1, // Default userId if not provided
    first: req.body.first,
    second: req.body.second,
    third: req.body.third,
    fourth: req.body.fourth,
    fifth: req.body.fifth,
    sixth: req.body.sixth
  });

  try {
    const newMistake = await mistake.save();
    res.status(201).json(newMistake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get mistakes by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const mistakes = await Mistake.find({ userId: req.params.userId });
    res.json(mistakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
