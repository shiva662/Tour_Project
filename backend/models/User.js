// models/User.js
// Mongoose schema for users of Explore India

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,               // ensure no duplicates
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  // array of places the user has saved/favorited
  savedPlaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now           // timestamp for account creation
  }
});

module.exports = mongoose.model('User', userSchema);