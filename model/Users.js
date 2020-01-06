const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic:{
        type: Object,
        required: true
    },
    buyPlan: {
        type: Boolean,
        default: false
    },
    plan: {
        type: String,
    }
})

const Users = mongoose.model('Users',userSchema)

module.exports = Users;