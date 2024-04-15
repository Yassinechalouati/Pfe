const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/NotificationFeedback', auth, roleCheck(["Tutor"]), (req, res) => {
    const {
        lessonId,
        accepted
    } = req.body

    console.log("condition: ", (accepted !==0 && accepted !==1));

    if(!lessonId || (accepted !==0 && accepted !==1)) {
        res.status(400).json({ message: "Bad Data!" });
        return // to avoid further execution when data missing 
    }

    const query = ` 
    UPDATE private_lesson
    set Accepted = ?
    where lesson_id = ?
    `
    mysql.query(query, [accepted, lessonId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json({message: "Updated"})
        }
    })
    
})

module.exports = router