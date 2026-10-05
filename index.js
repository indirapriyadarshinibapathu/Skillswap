const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Auth Routes & User Model Imports
const authRoutes = require('./server/routes/authRoutes');
const User = require('./server/models/User');

// Direct Memory Server Connection (No External Setup Required)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
  }
};
connectDB();

// Input Validation Middleware
const validateUserInput = (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: fullName, email, and password are required!'
    });
  }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Please provide a valid email address!'
    });
  }

  next();
};

// 1. Separate Authentication Routes (/api/auth/register, /api/auth/login)
app.use('/api/auth', authRoutes);

// 2. Direct Registration Route (With Hashing & Middleware Validation)
app.post('/api/users', validateUserInput, async (req, res) => {
  try {
    const { fullName, email, password, gradYear, userBio, avatarImage, teachSkills, learnSkills } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists!'
      });
    }

    // Secure Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gradYear,
      userBio,
      avatarImage,
      teachSkills,
      learnSkills
    });

    await newUser.save();

    // Hide password in output response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User created successfully with Middleware Validation!',
      data: userResponse
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. GET Users Route
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running live on port ${PORT}`);
});