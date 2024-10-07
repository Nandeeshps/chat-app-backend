const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

module.exports = router;
