// controllers/placeController.js
// CRUD operations for Indian travel places

const Place = require('../models/Place');

// Add a new place (protected)
const addPlace = async (req, res) => {
  try {
    const { title, description, state, city, imageUrl } = req.body;
    const userId = req.user.id;  // from JWT middleware

    // validation
    if (!title || !description || !state || !city) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (description.length < 10) {
      return res.status(400).json({ message: 'Description must be at least 10 characters' });
    }

    // create place
    const place = new Place({
      title,
      description,
      state,
      city,
      imageUrl: imageUrl || null,
      createdBy: userId
    });

    await place.save();

    // populate creator info for response
    await place.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Place added successfully',
      place
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all places with search and pagination - public
const getAllPlaces = async (req, res) => {
  try {
    const { search, state, page = 1 } = req.query;

    // Build filter object
    const filter = {};
    if (state) filter.state = state;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination (fixed page size)
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = 6; // fixed per-page value (removed per-page option)
    const skip = (pageNum - 1) * limitNum;

    // Default sort: newest first
    const places = await Place.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalPlaces = await Place.countDocuments(filter);
    const totalPages = Math.ceil(totalPlaces / limitNum) || 1;

    res.json({
      success: true,
      currentPage: pageNum,
      totalPages,
      totalPlaces,
      placesPerPage: limitNum,
      places
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single place by ID - public
const getSinglePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const place = await Place.findById(id).populate('createdBy', 'name email');

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json(place);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update place (protected - only creator)
const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, state, city, imageUrl } = req.body;

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // check authorization
    if (place.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Only creator can update this place' });
    }

    // update fields
    if (title) place.title = title;
    if (description) place.description = description;
    if (state) place.state = state;
    if (city) place.city = city;
    if (imageUrl) place.imageUrl = imageUrl;

    await place.save();
    await place.populate('createdBy', 'name email');

    res.json({
      message: 'Place updated successfully',
      place
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete place (protected - only creator)
const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // check authorization
    if (place.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Only creator can delete this place' });
    }

    await Place.findByIdAndDelete(id);

    res.json({
      message: 'Place deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
  deletePlace
};