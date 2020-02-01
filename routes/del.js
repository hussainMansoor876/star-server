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
    Company.findByIdAndDelete({ _id: _id })
        .then((response) => {
            console.log('res', response)
            Users.findOneAndUpdate({ _id: response.ownerId }, { buyPlan: false, plan: null, subDate: null })
        })
    return res.send({ success: true })
})

module.exports = router