const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills.controller');

// GET skills
router.get('/', skillsController.getSkills);

// Optional: POST skills
router.post('/', skillsController.addSkills);

module.exports = router;
