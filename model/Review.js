const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: true
    },
    feedback: {
        
    }
})

const Users = mongoose.model('review', reviewSchema)

module.exports = Users;