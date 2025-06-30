const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  github: String,
  techStack: [String],  // e.g., ["Flutter", "Firebase", "Django"]
  projectType: {
    type: String,
    enum: ['Android', 'Node.js', 'Python', 'Flutter', 'Web', 'Other'],
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
