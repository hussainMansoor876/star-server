const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')


router.post('/approved', (req, res) => {
    console.log(req.body.id)
    Company.findByIdAndUpdate(req.body.id, { status: 'approved' })
        .then((response) => {
            return res.send({ success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})

module.exports = router