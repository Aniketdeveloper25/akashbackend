const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Define appointment routes here
router.get('/', authMiddleware, (req, res) => {
    res.json({ message: 'Appointments retrieved successfully' });
});

router.post('/', authMiddleware, (req, res) => {
    res.json({ message: 'Appointment created successfully' });
});

router.put('/:id', authMiddleware, (req, res) => {
    res.json({ message: 'Appointment updated successfully' });
});

router.delete('/:id', authMiddleware, (req, res) => {
    res.json({ message: 'Appointment deleted successfully' });
});

module.exports = router;