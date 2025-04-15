// routes/auth.js
console.log("auth.js routes loaded"); // This file handles authentication routes for login and registration, line added for debugging purposes
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');  // Adjust path if needed
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'HpfAbGliw3GaGE+QhxUrya4XoSGxsEvrQMt7kKngMAfgzqwYVihOE4rUJKhmQljiKzKK/m87sifeWBf6xolKg==';

// Login Endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const employee = await Employee.findOne({ where: { username } });
    if (!employee || !(await employee.validPassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // Create a token with payload containing employee data and an expiration
    const token = jwt.sign(
      { id: employee.id, username: employee.username, role: employee.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      token,
      employee: { id: employee.id, username: employee.username, role: employee.role }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Registration Endpoint (for POC simplicity)
router.post('/register', async (req, res) => {
  try {
    // For production ensure you validate and sanitise input here
    const employee = await Employee.create(req.body);
    res.json({ employee });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
