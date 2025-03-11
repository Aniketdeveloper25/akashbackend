const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Get all barbers
router.get('/', (req, res) => {
    res.json({ message: 'Barbers retrieved successfully' });
});

// Add a new barber (admin only)
router.post('/', [authMiddleware, adminMiddleware], (req, res) => {
    res.json({ message: 'Barber added successfully' });
});

// Update a barber (admin only)
router.put('/:id', [authMiddleware, adminMiddleware], (req, res) => {
    res.json({ message: 'Barber updated successfully' });
});

// Delete a barber (admin only)
router.delete('/:id', [authMiddleware, adminMiddleware], (req, res) => {
    res.json({ message: 'Barber deleted successfully' });
});

module.exports = router;