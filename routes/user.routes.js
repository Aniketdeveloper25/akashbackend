const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Define user routes here
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Profile accessed successfully', user: req.user });
});

// Add more user-specific routes as needed

module.exports = router;