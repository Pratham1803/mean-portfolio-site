const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [String], // e.g., ["Node.js", "Angular", "MongoDB"]
  type: {
    type: String,
    enum: ["current", "past"],
    required: true,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);