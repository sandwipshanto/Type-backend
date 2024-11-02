// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const Test = require('../models/Text');
const User = require('../models/User');

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find()
      .populate('userId', 'name registrationNumber department')
      .sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tests by user registration number
router.get('/user/:regNo', async (req, res) => {
  try {
    const user = await User.findOne({ registrationNumber: req.params.regNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tests = await Test.find({ userId: user._id })
      .sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new test
router.post('/', async (req, res) => {
  try {
    // Find or create user
    let user = await User.findOne({ registrationNumber: req.body.registrationNumber });
    
    if (!user) {
      user = new User({
        name: req.body.name,
        department: req.body.department,
        registrationNumber: req.body.registrationNumber
      });
      await user.save();
    }

    const test = new Test({
      userId: user._id,
      timeIntervalStat: req.body.timeIntervalStat,
      halfTime: req.body.halfTime,
      breakTime: req.body.breakTime,
      characterTyped: req.body.characterTyped,
      mistakes: req.body.mistakes
    });

    const newTest = await test.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get test statistics for a user
router.get('/stats/:regNo', async (req, res) => {
  try {
    const user = await User.findOne({ registrationNumber: req.params.regNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tests = await Test.find({ userId: user._id });
    
    const stats = {
      totalTests: tests.length,
      averageMistakes: tests.reduce((acc, test) => acc + test.mistakes, 0) / tests.length,
      averageCharactersTyped: tests.reduce((acc, test) => acc + test.characterTyped, 0) / tests.length,
      bestTest: tests.reduce((best, test) => 
        (test.mistakes / test.characterTyped < best.mistakes / best.characterTyped) ? test : best, 
        tests[0]
      )
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;