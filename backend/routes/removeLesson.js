const express = require('express') 
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')


router.post('/deleteLesson', auth, (req, res) => {
    const {
        lesson_id
    } = req.body

    const query = `delete from private_lesson where lesson_id=? `
    mysql.query(query, [lesson_id], (err, result ) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log("deleted")
            res.status(200).json({message: "deleted"})
        }
    })
})

module.exports = router