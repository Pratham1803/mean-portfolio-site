const About = require('../models/about.model');

// GET /api/about
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne(); // fetch first document
    if (!about) return res.status(404).json({ message: 'About info not found' });
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// POST /api/about (optional - for adding data)
exports.createAbout = async (req, res) => {
  try {
    const newAbout = new About(req.body);
    await newAbout.save();
    res.status(201).json(newAbout);
  } catch (error) {
    res.status(400).json({ message: 'Creation failed', error });
  }
};
