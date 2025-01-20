const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL;
mongoose.connect(uri, { dbName: 'mern_app' })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Error Details:', error);
  });
