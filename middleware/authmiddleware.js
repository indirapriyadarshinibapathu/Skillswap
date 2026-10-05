// middleware/authMiddleware.js

const validateUserInput = (req, res, next) => {
  const { fullName, email, password } = req.body;

  // Request body check
  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Validation Failed: fullName, email, and password are required!'
    });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Failed: Please enter a valid email address!'
    });
  }

  // Validation pass aithe next step ki velthundi
  next();
};

module.exports = { validateUserInput };