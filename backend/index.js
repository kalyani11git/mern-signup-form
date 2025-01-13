const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://mern-signup-form-frontend.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Connect to MongoDB
require('./db');

const User = require('./models/User');

app.get('/',async(req,res)=>{
    res.send("hello user");
})

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
      const { firstname, lastname, email, password, age, mobile, gender } = req.body;
  
      // Simple validation (can be improved)
      if (!firstname || !lastname || !email || !password || !age || !mobile || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newUser = new User({ firstname, lastname, email, password, age, mobile, gender  });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        // console.error('Internal server error:', error);  
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
