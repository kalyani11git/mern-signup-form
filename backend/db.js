const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb://kalyanimali:kalyani123 @localhost:27017/mern_numetry_db?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
