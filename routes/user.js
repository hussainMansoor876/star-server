const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var slugify = require('slugify')
const saltRounds = 10;
var cloudinary = require('cloudinary').v2
const Users = require('../model/Users')

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
    const { body } = req
    bcrypt.hash(body.password, saltRounds)
        .then((hashPassword) => {
            console.log('hash', hashPassword)
            const user = new Users({
                name: body.name,
                email: body.email,
                age: body.age,
                password: hashPassword
            })
            user.save()
                .then(() => res.send({ message: 'User successfully Add' }))
                .catch(e => res.send(500, { message: e.message }))
        })
        .catch((e) => {
            return res.send({ message: e.message })
        })
})

router.post('/login', (req, res) => {
    const { body } = req
    Users.findOne({ email: body.email })
        .then((response) => {
            bcrypt.compare(body.password, response.password)
                .then((result) => {
                    if (result) {
                        var data = {
                            email: response.email,
                            _id: response._id,
                            name: response.name
                        }
                        return res.send({ data, bool: true })
                    }
                    else {
                        return res.send({ bool: false, message: 'Incorrect Email or password' })
                    }
                })
        })
        .catch((error) => {
            return res.send({ bool: false, message: error.message })
        })

})


router.post('/createCompany', (req, res) => {
    const { body } = req
    console.log(req.files)
    body.averageRating = JSON.parse(body.averageRating)
    body.slug = slugify(body.title, {
        replacement: '-',
        remove: null,
        lower: true,
      })
    body.slug = `${body.ownerId}/${body.slug}`
    console.log(body)
    // cloudinary.uploader.upload(req.files.photo.tempFilePath, (err, result) => {
    //     if (err) {
    //         return res.send({ bool: false, })
    //     }
    //     console.log('upload', result)
    // })
    res.send({ a: true })
    // const user = new Users(body)
})



router.delete('/del', (req, res) => {
    const { body } = req;
    console.log(body)

    Users.deleteOne({ name: body.name })
        .then((response) => {
            console.log('im running')
            res.send({ message: 'User deleted', response })
        })
        .catch(e => res.send({ message: e.message }))
})

router.put('/put', (req, res) => {
    const { body } = req;
    console.log(body)

    Users.updateOne({ name: "Hussain" }, { name: body.name })
        .then((response) => {
            console.log('im running')
            res.send({ message: 'User Update Successfully', response })
        })
        .catch(e => res.send({ message: e.message }))
})

router.post('/post', (request, response) => {
    const user = new Users(request.body);

    user.save()
        .then((res) => response.send({ message: 'User successfully Add' }))
        .catch(e => response.send(500, { message: e.message }))
})

module.exports = router