const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  categories: {
    mobileDev: [String],
    backend: [String],
    database: [String],
    tools: [String]
  },
  programmingSkills: [{
    language: String,
    proficiency: Number
  }],
  otherSkills: [{
    name: String,
    proficiency: Number
  }]
});

module.exports = mongoose.model('Skill', skillSchema);
