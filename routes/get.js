const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')
// 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

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

router.get('/peding-reviews', (req, res) => {
    Review.find({ status: 'pending' }).sort({ timestamp: -1 })
        .then((response) => {
            return res.send({ data: response, success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})

router.get('/get-company', (req, res) => {
    var companyArr = []
    Review.find({ status: 'approved' }).sort({ timestamp: -1 })
        .then((response) => {
            var id = response.map(v => v.companyId)
            var unique = id.filter((v, i, a) => a.indexOf(v) === i)
            for (var i of unique) {
                Company.findById({ _id: i })
                    .then((result) => {
                        companyArr.push(result)
                    })
            }
            return res.send({ data: companyArr, success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})


router.get('/all-users', (req, res) => {
    Users.find({}, { password: 0 })
        .then((response) => {
            return res.send({ data: response, success: true })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})

module.exports = router