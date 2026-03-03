// routes/reviewRoutes.js
// Routes for reviews: add, list, delete

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addReview, getPlaceReviews, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

// POST - add review for a place (protected)
router.post('/:placeId', authMiddleware, addReview);

// GET - get reviews for a place (public)
router.get('/:placeId', getPlaceReviews);

// DELETE - delete review by id (protected)
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;
