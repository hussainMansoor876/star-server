const express = require('express');
const router = express.Router();
const Users = require('../model/Users')

router.get('/get/:id', (req, res) => {
    console.log('Get', req.params.id)
    Users.findById({ _id: '5c40a9663313fb1ae0592755' })
        .then((response) => {
            return res.send(response)
        })
        .catch(e => console.log(e))
})

router.post('/signup', (req, res) => {
    console.log('req', req.body)
})

router.post('/signup', (req, res) => {
    console.log('req', req.body)
})

router.get('/getAll', (req, res) => {
    Users.find({})
        .then((response) => {
            return res.send(response)
        })
        .catch(e => console.log(e))
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


router.get('/find/:id', (req, res) => {
    Users.findById(req.param.id)
        .then((response) => {
            return res.send(response)
        })
})

router.post('/post', (request, response) => {
    const user = new Users(request.body);

    user.save()
        .then((res) => response.send({ message: 'User successfully Add' }))
        .catch(e => response.send(500, { message: e.message }))
})

module.exports = router