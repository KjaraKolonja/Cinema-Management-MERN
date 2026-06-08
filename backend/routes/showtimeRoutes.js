const express = require('express');
const router = express.Router();
const { getShowtimes, createShowtime, updateShowtime, deleteShowtime } = require('../controllers/showtimeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getShowtimes);
router.post('/', protect, createShowtime);
router.put('/:id', protect, updateShowtime);
router.delete('/:id', protect, deleteShowtime);

module.exports = router;