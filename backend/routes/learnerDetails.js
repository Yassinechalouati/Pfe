const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/details', auth, roleCheck(["Learner"]), (req, res) => {
    res.status(200).json({message:"details!"})
})

module.exports = router