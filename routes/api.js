const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Session = require('../models/session');
const Message = require('../models/message');

// Test Route
router.get('/test', (req, res) => {
  res.json({ message: "API is working!" });
});

module.exports = router;