const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')
const mongoose = require('mongoose');
// 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
var sgMail = require('@sendgrid/mail');
const sendgridApi = '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'

sgMail.setApiKey(sendgridApi)

const msg = {
    to: 'hussainmansoor876@gmail.com',
    from: 'mansoorrajput888@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

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
    sgMail.send(msg)
        .then(response => {
            console.log('response')
        })
        .catch(e => console.log('error', e.message))
    Review.find({ status: 'approved' }).sort({ timestamp: -1 })
        .then((response) => {
            var id = response.map(v => v.companyId)
            var unique = id.filter((v, i, a) => a.indexOf(v) === i)
            Company.find({ _id: { $in: unique.length >= 6 ? unique.slice(0, 6) : unique } }).populate({
                path: 'reviews',
                match: { status: 'approved' }
            }).exec()
                .then((result) => {
                    return res.send({ data: result, success: true })
                })
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