const asyncHandler = require('express-async-handler');
const Showtime = require('../models/showtimeModel');

// @desc Get all showtimes
// @route GET /api/showtimes
const getShowtimes = asyncHandler(async (req, res) => {
    const showtimes = await Showtime.find().populate('movie', 'title genre poster');
    res.json(showtimes);
});

// @desc Create showtime
// @route POST /api/showtimes
const createShowtime = asyncHandler(async (req, res) => {
    const { movie, hall, date, price } = req.body;

    if (!movie || !hall || !date || !price) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const showtime = await Showtime.create({ movie, hall, date, price });
    res.status(201).json(showtime);
});

// @desc Update showtime
// @route PUT /api/showtimes/:id
const updateShowtime = asyncHandler(async (req, res) => {
    const showtime = await Showtime.findById(req.params.id);

    if (!showtime) {
        res.status(404);
        throw new Error('Showtime not found');
    }

    const updatedShowtime = await Showtime.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedShowtime);
});

// @desc Delete showtime
// @route DELETE /api/showtimes/:id
const deleteShowtime = asyncHandler(async (req, res) => {
    const showtime = await Showtime.findById(req.params.id);

    if (!showtime) {
        res.status(404);
        throw new Error('Showtime not found');
    }

    await showtime.deleteOne();
    res.json({ id: req.params.id });
});

module.exports = { getShowtimes, createShowtime, updateShowtime, deleteShowtime };