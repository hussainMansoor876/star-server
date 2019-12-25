const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))
router.use('/get', require('./get'))
router.use('/id', require('./id'))

router.get('/check', (req, res) => {
    return res.send({ message: "BackEnd is working" })
})

// router.use('/post',require('./post'))

module.exports = router