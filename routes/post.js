const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')


router.post('/approved', (req, res) => {
    Company.findByIdAndUpdate(req.body.id, { status: 'approved' })
        .then((response) => {
            return res.send({ success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})

router.post('/search', (req, res) => {
    const { searchType, searchInput } = req.body
    if (searchType === 'company') {
        Company.find({ name: { $regex: searchInput, '$options': 'i' }, status: 'approved' })
            .then((response) => {
                return res.send({ success: true, data: response })
            })
    }
    else {
        Users.find({ name: { $regex: 'hussain', '$options': 'i' } }, { password: 0 })
            .then((response) => {
                return res.send({ success: true, data: response })
            })
    }
})

router.post('/search-profile', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    Users.findById({ _id: _id }, { password: 0 })
        .then((response) => {
            return res.send({ success: true, data: response })
        })
        .catch((e) => {
            return res.send({ success: false, data: '' })
        })
})

router.post('/search-company', (req, res) => {
    const { _id } = req.body
    Company.findOne({ _id: _id, status: 'approved' })
        .then((response) => {
            return res.send({ success: true, data: response })
        })
        .catch((e) => {
            return res.send({ success: false, data: '' })
        })
})

module.exports = router