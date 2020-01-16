const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 1);
const Schema = mongoose.Schema

const SchemaTypes = mongoose.Schema.Types

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true,
        unique: true
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
    country: {
        type: String,
        required: true
    },
    city: {
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
    slug: {
        type: String,
        required: true,
    },
    slugUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    averageRating: {
        type: String,
        required: false
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'review'
    }
})

const Company = mongoose.model('company', companySchema)

module.exports = Company;