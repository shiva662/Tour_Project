// routes/placeRoutes.js
// REST routes for places management

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  addPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
  deletePlace
} = require('../controllers/placeController');

const router = express.Router();

// Dev-only: seed sample user + places (only when not in production)
const Place = require('../models/Place');
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/seed/dev', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Not allowed in production' });
    }

    const existingPlaces = await Place.countDocuments();
    if (existingPlaces > 0) {
      return res.json({ message: 'Places collection already has data', total: existingPlaces });
    }

    // create demo user (or reuse if exists)
    let demoUser = await User.findOne({ email: 'demo@local' });
    if (!demoUser) {
      const hashed = await bcrypt.hash('password123', 10);
      demoUser = new User({ name: 'Demo User', email: 'demo@local', password: hashed });
      await demoUser.save();
    }

    const samples = [
      {
        title: 'Taj Mahal',
        description: 'Iconic white marble mausoleum built by Mughal emperor Shah Jahan.',
        state: 'Uttar Pradesh',
        city: 'Agra',
        createdBy: demoUser._id
      },
      {
        title: 'Varanasi Ghats',
        description: 'Ancient ghats on the Ganges popular for rituals and sunrise boat rides.',
        state: 'Uttar Pradesh',
        city: 'Varanasi',
        createdBy: demoUser._id
      },
      {
        title: 'Gateway of India',
        description: 'Historic monument overlooking the Arabian Sea in Mumbai.',
        state: 'Maharashtra',
        city: 'Mumbai',
        createdBy: demoUser._id
      }
    ];

    await Place.insertMany(samples);

    res.json({ message: 'Seeded demo user and places', created: samples.length });
  } catch (err) {
    console.error('Seed error', err);
    res.status(500).json({ message: 'Seed failed', error: err.message });
  }
});

// POST - Add place (protected)
router.post('/', authMiddleware, addPlace);

// GET - Get all places with optional state filter (public)
router.get('/', getAllPlaces);

// GET - Get single place by ID (public)
router.get('/:id', getSinglePlace);

// PUT - Update place (protected)
router.put('/:id', authMiddleware, updatePlace);

// DELETE - Delete place (protected)
router.delete('/:id', authMiddleware, deletePlace);

module.exports = router;