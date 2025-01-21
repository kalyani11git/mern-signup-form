const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL;
  // "mongodb+srv://rcpitwork11:kalyanimali11@cluster0.liobdhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log(process.env.DATABASE_URL);
mongoose.connect(uri, { dbName: 'mern_app' })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Error Details:', error);
  });
