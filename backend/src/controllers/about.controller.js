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

// PUT /api/about (update existing or create if missing)
exports.updateAbout = async (req, res) => {
  try {
    const updatedAbout = await About.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    res.json(updatedAbout);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error });
  }
};
