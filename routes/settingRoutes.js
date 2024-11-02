const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Get current settings
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = new Setting({
        halfTime: 10, // 5 minutes
        breakTime: 5  // 1 minute
      });
      await settings.save();
    }
    return res.json(settings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update settings (admin only)
router.put('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting();
    }

    settings.halfTime = req.body.halfTime || settings.halfTime;
    settings.breakTime = req.body.breakTime || settings.breakTime;

    const updatedSettings = await settings.save();
    return res.json(updatedSettings);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { breakTime, halfTime } = req.body;
    console.log(breakTime, halfTime)
    const updatedResult = await Setting.updateOne({
      halfTime,
      breakTime
    })
    return res.status(200).json({
      mesage: "Settings updated successfully",
      updatedDate: updatedResult
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong on the server"
    })
  }
})

module.exports = router;