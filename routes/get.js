const express = require('express');
const router = express.Router();
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')

router.get('/:id/', (req, res) => {
    const { params } = req
    console.log(params)
    Company.findOne({ ownerId: params.id })
        .then((response) => {
            return res.send(response)
        })
        .catch(e => console.log(e))
})


module.exports = router