const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/getNotifications', auth, roleCheck(["Tutor"]), (req, res) => {
    const userId = req.user.id

    //getting the scheduled lessons that didn't expire yet in an ascending order
    const query = `SELECT pl.*, l.pfp, l.firstname, l.lastname, l.isConnected
    FROM private_lesson AS pl, learner AS l
    WHERE pl.private_learner_id = l.id
    AND pl.start_time > NOW()
    ORDER BY pl.start_time ASC;`

    mysql.query(query, [userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log(result)
            res.status(200).json({message: result})
        }
    })
})

module.exports = router