const express = require('express')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')
const router = express.Router()


router.post('/getNotifications', auth, roleCheck(["Learner"]), (req, res) => {
    const userId= req.user.id
    const { page, pageSize } = req.body;

    const offset = (page - 1) * pageSize;

    const query = `
        SELECT pl.*, t.pfp, t.firstname, t.lastname, t.isConnected
        FROM private_lesson AS pl, tutor AS t
        WHERE pl.tutor_id = t.id
        AND pl.private_learner_id = ?
        AND pl.start_time > NOW()
        ORDER BY pl.start_time ASC
        LIMIT ?, ?;`;

    mysql.query(query, [userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log("Learner getNotifications Called with result length : ", result.length);
            res.status(200).json({message: result})

        }
    })



})


module.exports = router