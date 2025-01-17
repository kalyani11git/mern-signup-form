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
const start = Date.now();  // Start timing
    const { username, email, password, age, mobile, gender } = req.body;

    if (!username || !email || !password || !age || !mobile || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new User({ username, email, password, age, mobile, gender });
    await newUser.save();

    console.log(`User saved in: ${Date.now() - start}ms`);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      // Check if user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare passwords directly (since they are stored in plain text)
      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
