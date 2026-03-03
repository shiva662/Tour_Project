// models/Place.js
// Mongoose schema for Indian travel places

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Place title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: 10
  },
  state: {
    type: String,
    required: [true, 'Indian state is required'],
    enum: [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
      'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
      'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
      'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
      'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ]
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Aggregated review info
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Place', placeSchema);