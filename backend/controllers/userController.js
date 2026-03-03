// controllers/userController.js
// Handles user-specific actions such as saving and unsaving places

const User = require('../models/User');
const Place = require('../models/Place');

// add a place to user's savedPlaces
const savePlace = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { placeId } = req.params;

    if (!userId) return res.status(401).json({ message: 'Authentication required' });
    if (!placeId) return res.status(400).json({ message: 'Place ID required' });

    // verify place exists
    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // prevent duplicate saves
    if (user.savedPlaces && user.savedPlaces.includes(placeId)) {
      return res.status(400).json({ message: 'Place already saved' });
    }

    user.savedPlaces = user.savedPlaces || [];
    user.savedPlaces.push(placeId);
    await user.save();

    res.json({ message: 'Place saved' });
  } catch (err) {
    console.error('savePlace error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// remove a place from saved list
const unsavePlace = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { placeId } = req.params;

    if (!userId) return res.status(401).json({ message: 'Authentication required' });
    if (!placeId) return res.status(400).json({ message: 'Place ID required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedPlaces = (user.savedPlaces || []).filter(id => id.toString() !== placeId);
    await user.save();

    res.json({ message: 'Place unsaved' });
  } catch (err) {
    console.error('unsavePlace error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// return populated list of saved places for the current user
const getSavedPlaces = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Authentication required' });

    const user = await User.findById(userId).populate('savedPlaces');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, savedPlaces: user.savedPlaces });
  } catch (err) {
    console.error('getSavedPlaces error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  savePlace,
  unsavePlace,
  getSavedPlaces
};