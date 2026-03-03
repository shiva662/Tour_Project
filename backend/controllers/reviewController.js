// controllers/reviewController.js
// Handles adding, listing and deleting reviews for places

const Review = require('../models/Review');
const Place = require('../models/Place');
const User = require('../models/User');

// Helper to recalculate average rating and totalReviews for a place
async function recalcPlaceStats(placeId) {
  const agg = await Review.aggregate([
    { $match: { place: placeId } },
    {
      $group: {
        _id: '$place',
        totalRating: { $sum: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  if (agg.length === 0) {
    // no reviews
    await Place.findByIdAndUpdate(placeId, { averageRating: 0, totalReviews: 0 });
    return { averageRating: 0, totalReviews: 0 };
  }

  const totalRating = agg[0].totalRating;
  const count = agg[0].count;
  const avg = Math.round((totalRating / count) * 10) / 10; // one decimal

  await Place.findByIdAndUpdate(placeId, { averageRating: avg, totalReviews: count });
  return { averageRating: avg, totalReviews: count };
}

// POST /api/reviews/:placeId - add a review (protected)
const addReview = async (req, res) => {
  try {
    const { placeId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user && req.user.id;

    if (!userId) return res.status(401).json({ message: 'Authentication required' });
    if (!rating || !comment) return res.status(400).json({ message: 'Rating and comment are required' });

    // Ensure rating in range
    const r = Number(rating);
    if (isNaN(r) || r < 1 || r > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });

    // Check if user already reviewed this place
    const existing = await Review.findOne({ place: placeId, user: userId });
    if (existing) return res.status(400).json({ message: 'You have already reviewed this place' });

    const review = new Review({ rating: r, comment, user: userId, place: placeId });
    await review.save();

    // populate user's name for response
    await review.populate('user', 'name');

    // Recalculate place stats
    await recalcPlaceStats(placeId);

    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    // Handle unique index violation gracefully
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this place' });
    }
    console.error('addReview error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/reviews/:placeId - get all reviews for a place (public)
const getPlaceReviews = async (req, res) => {
  try {
    const { placeId } = req.params;

    const reviews = await Review.find({ place: placeId })
      .sort({ createdAt: -1 })
      .populate('user', 'name');

    res.json({ success: true, reviews });
  } catch (err) {
    console.error('getPlaceReviews error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/reviews/:reviewId - delete a review (protected, owner only)
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user && req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== userId) return res.status(403).json({ message: 'Not authorized' });

    const placeId = review.place;
    await Review.findByIdAndDelete(reviewId);

    // Recalculate place stats
    await recalcPlaceStats(placeId);

    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('deleteReview error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addReview,
  getPlaceReviews,
  deleteReview
};
