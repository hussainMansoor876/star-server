const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))
router.use('/get', require('./get'))
router.use('/post', require('./post'))
router.use('/id', require('./id'))
router.use('/del', require('./del'))

router.get('/check', (req, res) => {
    return res.send({ message: "BackEnd is working" })
})

// router.use('/post',require('./post'))

module.exports = router