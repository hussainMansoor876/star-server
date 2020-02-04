const mongoose = require('mongoose');

const SchemaTypes = mongoose.Schema.Types

const reviewSchema = new mongoose.Schema({
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
        type: String,
        required: true
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
    video: {
        type: Object,
        required: false
    },
    customerService: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
})

const Review = mongoose.model('review', reviewSchema)

module.exports = Review;