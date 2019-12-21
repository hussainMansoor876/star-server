const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
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
        type: Number,
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
    
})

const Users = mongoose.model('company',companySchema)

module.exports = Users;