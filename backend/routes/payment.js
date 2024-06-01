const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck= require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')

router.post('/payment', auth, roleCheck(["Learner"]), (req, res) => {
    console.log(req.body);
})


module.exports = router