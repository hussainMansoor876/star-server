const mongoose = require('mongoose');

const SchemaTypes = mongoose.Schema.Types

const reviewSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    reveiwerId: {
        type: String,
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
    video: {
        type: Object,
        required: false
    },
    customerService: {
        type: Number,
        required: true
    }
})

const Review = mongoose.model('review', reviewSchema)

module.exports = Review;