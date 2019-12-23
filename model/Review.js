const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: true
    },
    feedback: {
        type: String
    },
    applicationStars: {
        type: Number,
    },
    featuresStars: {
        type: Number,
    },
    clarityStars: {
        type: Number,
    },
    privacyStars: {
        type: Number,
    },
    useStars: {
        type: Number,
        required: true
    },
    customerService: {
        type: Number,
        required: true
    },
    benefit: {
        type: Number,
    }
})

const Users = mongoose.model('review', reviewSchema)

module.exports = Users;