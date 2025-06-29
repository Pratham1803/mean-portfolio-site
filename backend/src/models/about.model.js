const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  title: String,
  duration: String,
  location: String,
  percentage: String
});

const aboutSchema = new mongoose.Schema({
  name: String,
  tagLine: String,
  profilePhoto: String,      // link to photo in public folder
  github: String,
  linkedin: String,
  resume: String,            // link to resume file in public folder
  instagram: String,
  email: String,
  location: String,
  title: String,
  description: String,
  education: [educationSchema]
});

module.exports = mongoose.model('About', aboutSchema);
