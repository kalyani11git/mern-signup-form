const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to increase request timeout
app.use((req, res, next) => {
  req.setTimeout(30000); // Increase timeout to 30 seconds
  next();
});

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
    console.log('Request to /signup received:', req.body);
// Other logs inside your try/catch block in /signup

    const { firstname, lastname, email, password, age, mobile, gender } = req.body;

    if (!firstname || !lastname || !email || !password || !age || !mobile || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

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
