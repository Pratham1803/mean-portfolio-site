const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all or by type
router.get('/', controller.getProjectsByType); // handles both / and /?type=...

// Add a new project
router.post('/', authMiddleware.verifyJWT, controller.addProject);

module.exports = router;
