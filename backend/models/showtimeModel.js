const mongoose = require('mongoose');

const showtimeSchema = mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Movie',
        },
        hall: {
            type: String,
            required: [true, 'Hall is required'],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Showtime', showtimeSchema);