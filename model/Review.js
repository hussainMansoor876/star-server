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
        required: true
    },
    featuresStars: {
        type: Number,
        required: true
    },
    clarityStars: {
        type: Number,
        required: true
    },
    privacyStars: {
        type: Number,
        required: true
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
        required: tru
    }
})

const Users = mongoose.model('review', reviewSchema)

module.exports = Users;