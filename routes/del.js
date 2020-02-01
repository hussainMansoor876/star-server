const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')


router.post('/user', (req, res) => {
    const { _id } = req.body
    console.log(_id)
})

router.post('/company', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    return res.send({ success: true })
})

module.exports = router