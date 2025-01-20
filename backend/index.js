const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cloudinary = require('./CloudinaryConfig'); // Import Cloudinary configuration
const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
const User = require('./models/User');
// const bcrypt = require('bcrypt'); // For password hashing (optional, recommended for better security)

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
<<<<<<< HEAD
  origin: 'http://localhost:5173', // Replace with your frontend URL
=======
  origin: 'https://mern-signup-form-frontend.vercel.app', // Replace with your frontend URL
>>>>>>> 3b68b3a39edab479606ea4585870108e0e0d3f07
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

// MongoDB Connection
require('./db');

// Import User Model


// Default Route
app.get('/', (req, res) => {
  res.send('Hello user');
});


// Use Multer to handle file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// Signup Endpoint

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, email, password, age, mobile, gender } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'user_profiles', resource_type: 'image' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    console.log("profileImage: "+uploadResult.secure_url);
    
    const newUser = new User({
      username,
      email,
      password,
      age,
      mobile,
      gender,
      profileImage: uploadResult.secure_url, 
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Login Endpoint
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
