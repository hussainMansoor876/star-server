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
        Company.find({ name: { $regex: searchInput, '$options': 'i' } })
            .then((response) => {
                return res.send({ success: true, data: response })
            })
        // Company.aggregate([{ $match: { name: searchInput } }])
        //     .then((response) => {
        //         return res.send({ success: true, data: response })
        //     })
    }
    else {
        Users.find({ name: { $regex: 'hussain', '$options': 'i' } })
            .then((response) => {
                return res.send({ success: true, data: response })
            })
    }
})

module.exports = router