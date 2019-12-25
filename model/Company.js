const mongoose = require('mongoose');
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Float32Array
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'review'
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    urlSlug: {
        type: String,
        required: true,
        unique: true,
    }
})

const Users = mongoose.model('company', companySchema)

module.exports = Users;