const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const router = express.Router();

// Get messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ time: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error); // Log the error
    res.status(500).send('Error fetching messages');
  }
});

// Send a message
router.post('/', async (req, res) => {
  const { sender, receiver, text } = req.body;
  try {
    const message = new Message({ sender, receiver, text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error); // Log the error
    res.status(500).send('Error sending message');
  }
});

module.exports = router;
