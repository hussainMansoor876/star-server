const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_SsQNGbXg56J4jyyYbugKo3Qi00LWkKQQXE");
const uuid = require("uuid/v4");
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
        Company.find({ name: { $regex: searchInput, '$options': 'i' }, status: 'approved' })
            .then((response) => {
                return res.send({ success: true, data: response })
            })
    }
    else {
        Users.find({ name: { $regex: 'hussain', '$options': 'i' } }, { password: 0 })
            .then((response) => {
                return res.send({ success: true, data: response })
            })
    }
})

router.post('/search-profile', (req, res) => {
    const { _id } = req.body
    Users.findById({ _id: _id }, { password: 0 })
        .then((response) => {
            return res.send({ success: true, data: response })
        })
        .catch((e) => {
            return res.send({ success: false, data: '' })
        })
})

router.post('/search-company', (req, res) => {
    const { _id } = req.body
    Company.findOne({ _id: _id, status: 'approved' })
        .then((response) => {
            return res.send({ success: true, data: response })
        })
        .catch((e) => {
            return res.send({ success: false, data: '' })
        })
})


router.post('/is-company', (req, res) => {
    const { _id } = req.body
    Company.findOne({ ownerId: _id })
        .then((response) => {
            if (response) {
                return res.send({ success: true, data: response })
            }
            return res.send({ success: false })
        })
        .catch((e) => {
            return res.send({ success: false })
        })
})


router.post("/checkout", async (req, res) => {
    let error;
    let status;
    const { product, token } = req.body;
    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const idempotencyKey = uuid();
        const charge = await stripe.charges.create(
            {
                amount: product.amount,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${product.name}`,
            },
            {
                idempotencyKey
            }
        );
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }
    if (status == "success") {
        Users.findOneAndUpdate({ _id: product._id }, { buyPlan: true, plan: product.amount == 2490 ? 'monthly' : 'yearly', subDate: new Date() }, { new: true })
            .then((response) => {
                var user = {
                    name: response.name,
                    email: response.email,
                    profilePic: response.profilePic,
                    buyPlan: response.buyPlan,
                    _id: response._id,
                    plan: response.plan,
                    subDate: response.subDate
                }
                return res.send({ success: true, data: user })
            })
            .catch((e) => {
                return res.send({ success: false })
            })
    }

});


router.post('/add-review', (req, res) => {
    const { values } = req.body
    console.log(values)
})



module.exports = router