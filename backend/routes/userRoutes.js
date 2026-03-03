// routes/userRoutes.js
// Routes for user-specific actions (save/unsave places, view saved)

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { savePlace, unsavePlace, getSavedPlaces } = require('../controllers/userController');

const router = express.Router();

// POST /api/users/save/:placeId - save a place
router.post('/save/:placeId', authMiddleware, savePlace);

// DELETE /api/users/unsave/:placeId - unsave a place
router.delete('/unsave/:placeId', authMiddleware, unsavePlace);

// GET /api/users/saved - list saved places
router.get('/saved', authMiddleware, getSavedPlaces);

module.exports = router;