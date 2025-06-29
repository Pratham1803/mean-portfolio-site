const Skill = require('../models/skills.model');

// GET /api/skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findOne(); // fetch first doc
    if (!skills) return res.status(404).json({ message: 'No skills found' });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Optional: POST /api/skills — only use for seeding or admin
exports.addSkills = async (req, res) => {
  try {
    const newSkills = new Skill(req.body);
    await newSkills.save();
    res.status(201).json(newSkills);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add skills', error });
  }
};
