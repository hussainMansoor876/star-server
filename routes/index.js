const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))

router.get('/check', (req, res) => {
    return res.send({ message: "BackEnd is working" })
})

// router.use('/post',require('./post'))

module.exports = router