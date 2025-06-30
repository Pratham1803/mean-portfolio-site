const Project = require('../models/project.model');

// GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 }); // newest first
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// POST /api/projects
exports.addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid project data', error });
  }
};

// (Optional) GET by category e.g., /api/projects?type=Android
exports.getProjectsByType = async (req, res) => {
  try {
    const type = req.query.type;
    const query = type ? { projectType: type } : {};
    const projects = await Project.find(query).sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering projects', error });
  }
};
