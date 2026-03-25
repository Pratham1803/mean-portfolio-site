const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');

// GET about info
router.get('/', aboutController.getAbout);

// POST (optional: only for inserting once or from admin panel)
router.post('/', aboutController.createAbout);

// PUT for updating existing about document
router.put('/', aboutController.updateAbout);

module.exports = router;
