const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')


router.post('/user', (req, res) => {
    const { _id } = req.body

    Users.findByIdAndDelete({ _id: _id })
        .then((response) => {
            if (response.buyPlan) {
                Company.findByIdAndDelete({ _id: _id })
                    .then(() => {
                        return res.send({ success: true })
                    })
            }
            return res.send({ success: true })
        })
        .catch((e) => {
            return res.send({ success: false })
        })
})

router.post('/company', (req, res) => {
    const { _id } = req.body
    Company.findByIdAndDelete({ _id: _id })
        .then((response) => {
            Users.findOneAndUpdate({ _id: response.ownerId }, { buyPlan: false, plan: null, subDate: null })
                .then(() => {
                    return res.send({ success: true })
                })
                .catch((e) => {
                    return res.send({ success: true })
                })
        })
        .catch((e) => {
            return res.send({ success: false })
        })
})

router.post('/review', (req, res) => {
    const { _id } = req.body
    Review.findByIdAndDelete({ _id: _id })
        .then((response) => {
            return res.send({ success: true })
        })
        .catch((e) => {
            return res.send({ success: false })
        })
})

module.exports = router