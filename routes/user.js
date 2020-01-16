const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var slugify = require('slugify')
const saltRounds = 10;
var cloudinary = require('cloudinary').v2
const Users = require('../model/Users')
const Company = require('../model/Company')
const Review = require('../model/Review')

cloudinary.config({
    cloud_name: 'dl39em2mk',
    api_key: '985614729712982',
    api_secret: '9dHefP6ub1zvmrlpl4mIU-hthG0'
});

router.get('/get/:id', (req, res) => {
    console.log('Get', req.params.id)
    Users.findById({ _id: '5c40a9663313fb1ae0592755' })
        .then((response) => {
            return res.send(response)
        })
        .catch(e => console.log(e))
})

router.post('/signup', (req, res) => {
    const { body, files } = req
    console.log(body)
    console.log(files)

    Users.findOne({ email: body.email }, (err, response) => {
        if (response) {
            return res.send({ success: false, message: 'Email Already Exist!!!' })
        }

        bcrypt.hash(body.password, saltRounds)
            .then((hashPassword) => {
                cloudinary.uploader.upload(files.upload.tempFilePath, (err, result) => {
                    if (err) {
                        return res.send({ success: false, })
                    }

                    body.profilePic = result
                    body.password = hashPassword
                    console.log(body)

                    const user = new Users({
                        name: body.name,
                        email: body.email,
                        password: hashPassword,
                        profilePic: result,
                    })

                    const data = {
                        name: body.name,
                        email: body.email,
                        profilePic: result,
                        _id: user._id
                    }
                    user.save()
                        .then(() => res.send({ message: 'Signup successfully!!!', success: true, user: data }))
                        .catch(e => res.send({ message: e.message, success: false }))
                })
            })
            .catch((e) => {
                return res.send({ message: e.message, success: false })
            })
    })
})

router.post('/login', (req, res) => {
    const { body } = req
    Users.findOne({ email: body.email })
        .then((response) => {
            bcrypt.compare(body.password, response.password)
                .then((result) => {
                    if (result) {
                        var user = {
                            name: response.name,
                            email: response.email,
                            profilePic: response.profilePic,
                            buyPlan: response.buyPlan,
                            plan: response.plan
                        }
                        return res.send({ user: user, success: true })
                    }
                    else {
                        return res.send({ success: false, message: 'Incorrect Email or password' })
                    }
                })
        })
        .catch((error) => {
            return res.send({ success: false, message: error.message })
        })

})


router.post('/createCompany', (req, res) => {
    const { body, files } = req
    console.log(req.files)
    console.log(req.body.data)
    // body.averageRating = JSON.parse(body.averageRating)
    // body.slug = slugify(body.title, {
    //     replacement: '-',
    //     remove: null,
    //     lower: true,
    // })
    // body.slugUrl = `${body.ownerId}/${body.slug}`
    // console.log(body)
    // cloudinary.uploader.upload(files.profilePic.tempFilePath, (err, result) => {
    //     if (err) {
    //         return res.send({ success: false, })
    //     }
    //     body.profilePic = result

    //     console.log(result)
    //     const company = new Company(body);

    //     company.save()
    //         .then(() => res.send({ success: true, message: 'Company Created Successfully' }))
    //         .catch(e => res.send({ success: false, message: e.message }))
    // })
})


router.post('/review', (req, res) => {
    const { body } = req
    // console.log('body', body)
    const review = new Review(body)

    review.save()
    Company.findByIdAndUpdate({ _id: body.companyId }, { $push: { reviews: review } })
        .then((response) => {
            console.log('res', response)
            return res.send({ success: true, message: 'Succesfully Added Review' })
        })
        .catch((e) => {
            return res.send({ success: false, message: e.message })
        })
})

module.exports = router