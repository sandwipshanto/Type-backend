const express = require('express');
const router = express.Router();
const Text = require('../models/Text');
const { dummyData } = require('../static');

// Get a random text
router.get('/random', async (req, res) => {
  try {
    const count = await Text.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomText = await Text.findOne().skip(random);
    res.json(randomText);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new text
router.post('/', async (req, res) => {
  // const text = new Text({
  //   content: req.body.content,
  // });
  try {
    await Text.insertMany(dummyData)
    return res.status(201).json({
      message: "Texts added successfully"
    })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;