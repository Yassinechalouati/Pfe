const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/getDayLessons', auth, roleCheck(["Learner"]), (req, res) => {
    const userId= req.user.id
    const {
        date //year-month-day
    } = req.body

    const query = `SELECT * FROM private_lesson where start_time >= NOW() AND DATE(start_time) = ?
    AND private_learner_id = ?`

    mysql.query(query, [date, userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }else {
            console.log(result)
            res.status(200).json({result: result})
        }
    })
})

module.exports = router