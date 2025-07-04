const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// POST /api/contact - Send contact email
router.post('/', contactController.sendContactEmail);

// GET /api/contact/test - Test email configuration
router.get('/test', contactController.testEmailConfig);

module.exports = router;
