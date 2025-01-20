const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dm2gw7sur', // Replace with your Cloudinary cloud name
  api_key: '673232598197731',       // Replace with your Cloudinary API key
  api_secret: 'Djy9Ugoz1ug0MiNibX3lTs-AbwQ', // Replace with your Cloudinary API secret
});

module.exports = cloudinary;


// cloud_name: 'dm2gw7sur', 
// api_key: '673232598197731', 