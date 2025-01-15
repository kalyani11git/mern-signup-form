const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// CORS Middleware
const corsOptions = {
  origin: 'https://mern-signup-form-frontend.vercel.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

// MongoDB Connection
require('./db');

// Import User Model
const User = require('./models/User');

// Default Route
app.get('/', (req, res) => {
  res.send('Hello user');
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, password, age, mobile, gender } = req.body;

    // Simple Validation
    if (!firstname || !lastname || !email || !password || !age || !mobile || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save User to Database
    const newUser = new User({ firstname, lastname, email, password, age, mobile, gender });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Internal server error:', error);  
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
