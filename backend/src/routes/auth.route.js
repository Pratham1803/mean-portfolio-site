const express = require('express');
const router = express.Router();
const { loginUser, logOutUser, refreshAccessToken, createAdminUser } = require('../controllers/auth.controller'); // Import the controller functions for the user
const { verifyJWT } = require('../middlewares/auth.middleware'); // Import the verifyJWT method from the auth middleware


router.route('/login').post(loginUser); // Create a new user login route that accepts POST requests 
router.route('/create-admin').post(createAdminUser); // Create a new user login route that accepts POST requests

// Protected routes that require authentication using JWT
router.route('/logout').post(verifyJWT, logOutUser); // Create a new user logout route that accepts POST requests 
router.route('/refresh-token').post(refreshAccessToken); // Create a new token refresh route that accepts POST requests

module.exports = router; // Export the router instance with the defined routes