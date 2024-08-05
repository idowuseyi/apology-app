const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({ Status: 201, Message: 'User registered successfully', Data: user });
  } catch (error) {
    res.status(500).json({ Status: 500, Message: 'Error registering user', Error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ Status: 401, Message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ Status: 200, Message: 'Login successful', Data: { token } });
  } catch (error) {
    res.status(500).json({ Status: 500, Message: 'Error logging in', Error: error.message });
  }
};
