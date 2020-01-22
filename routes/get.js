const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')

router.get('/all-company', (req, res) => {
    Company.find({})
        .then((response) => {
            return res.send({ data: response, success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})

router.get('/approved-company', (req, res) => {
    Company.find({ status: 'approved' })
        .then((response) => {
            return res.send({ data: response, success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})


router.get('/peding-company', (req, res) => {
    Company.find({ status: 'pending' })
        .then((response) => {
            return res.send({ data: response, success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})


router.get('/all-users', (req, res) => {
    Users.find({})
        .then((response) => {
            return res.send({ data: response, success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})

module.exports = router