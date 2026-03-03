// models/Review.js
// Mongoose schema for reviews left by users on places

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent a user from creating multiple reviews for the same place at the DB level
reviewSchema.index({ place: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
