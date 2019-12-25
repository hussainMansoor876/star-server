const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')

router.get('/:id/', (req, res) => {
    const { params } = req
    Users.findById({ _id: params.id })
        .then((response) => {
            return res.send({ data: response, bool: true })
        })
        .catch(e => console.log(e))
})

router.get('/all-company', (req, res) => {
    Company.find({})
        .then((response) => {
            return res.send({ data: response, bool: true })
        })
        .catch((e) => {
            return res.send({ bool: false, message: e.message })
        })
})

router.get('/:id/:slug', (req, res) => {
    const { params } = req
    Company.findOne({ ownerId: params.id, slug: params.slug })
        .then((response) => {
            return res.send({ data: response, bool: true })
        })
        .catch(e => console.log(e))
})


module.exports = router