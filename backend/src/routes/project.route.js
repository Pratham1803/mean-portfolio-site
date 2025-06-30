const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');

// Get all or by type
router.get('/', controller.getProjectsByType); // handles both / and /?type=...

// Add a new project
router.post('/', controller.addProject);

module.exports = router;
