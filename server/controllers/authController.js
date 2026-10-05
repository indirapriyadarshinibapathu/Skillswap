const User = require('../models/User'); // Me User model path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash Password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    return res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// LOGIN CONTROLLER (Strict Validation)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check User Existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid Email or Password' });
    }

    // 2. Compare Password with Hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Password wrong aithe direct reject
      return res.status(400).json({ success: false, message: 'Invalid Email or Password' });
    }

    // 3. Password correct aithe mathrame Token generate chesi Success response
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};