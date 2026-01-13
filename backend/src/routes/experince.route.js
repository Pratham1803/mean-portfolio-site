const express = require('express');
const router = express.Router();
const experinceController = require('../controllers/experince.controller');

// GET /api/experiences - Get all experiences
router.get('/', experinceController.getAllExperiences);
// POST /api/experiences - Add a new experience
router.post('/', experinceController.addExperience);

module.exports = router;