const Experince = require("../models/experince.model");

// GET /api/experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experince.find().sort({ index: -1 }); // Sort by duration or any other field
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST /api/experiences
exports.addExperience = async (req, res) => {
  try {
    const newExperience = new Experince(req.body);
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(400).json({ message: "Invalid experience data", error });
  }
};
