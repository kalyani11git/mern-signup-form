const mongoose = require('mongoose');

<<<<<<< HEAD
=======

>>>>>>> 3b68b3a39edab479606ea4585870108e0e0d3f07
const uri = process.env.DATABASE_URL;
mongoose.connect(uri, { dbName: 'mern_app' })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Error Details:', error);
  });
