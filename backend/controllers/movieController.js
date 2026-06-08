const asyncHandler = require('express-async-handler');
const Movie = require('../models/movieModel');

// @desc Get all movies
// @route GET /api/movies
const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.user.id });
    res.json(movies);
});

// @desc Create movie
// @route POST /api/movies
const createMovie = asyncHandler(async (req, res) => {
    const { title, description, genre, duration } = req.body;

    if (!title || !description || !genre || !duration) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const movie = await Movie.create({
        user: req.user.id,
        title,
        description,
        genre,
        duration,
        poster: req.file ? `/uploads/${req.file.filename}` : '',
    });

    res.status(201).json(movie);
});

// @desc Update movie
// @route PUT /api/movies/:id
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('Movie not found');
    }

    if (movie.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedMovie);
});

// @desc Delete movie
// @route DELETE /api/movies/:id
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('Movie not found');
    }

    if (movie.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await movie.deleteOne();
    res.json({ id: req.params.id });
});

module.exports = { getMovies, createMovie, updateMovie, deleteMovie };