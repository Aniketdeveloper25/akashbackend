const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Get all services
router.get('/', (req, res) => {
    res.json({ message: 'Services retrieved successfully' });
});

// Add a new service (admin only)
router.post('/', [authMiddleware, adminMiddleware], (req, res) => {
    res.json({ message: 'Service created successfully' });
});

// Update a service (admin only)
router.put('/:id', [authMiddleware, adminMiddleware], (req, res) => {
    res.json({ message: 'Service updated successfully' });
});

// Delete a service (admin only)
router.delete('/:id', [authMiddleware, adminMiddleware], (req, res) => {
    res.json({ message: 'Service deleted successfully' });
});

module.exports = router;