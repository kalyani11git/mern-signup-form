const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name:   process.env.CLOUD_NAME, //'dm2gw7sur', // Replace with your Cloudinary cloud name
  api_key: process.env.API_KEY,// '673232598197731',       // Replace with your Cloudinary API key
  api_secret: process.env.API_SECRET, //'Djy9Ugoz1ug0MiNibX3lTs-AbwQ', // Replace with your Cloudinary API secret
});

module.exports = cloudinary;



