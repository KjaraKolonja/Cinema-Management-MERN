const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        genre: {
            type: String,
            required: [true, 'Genre is required'],
        },
        duration: {
            type: Number,
            required: [true, 'Duration is required'],
        },
        poster: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);