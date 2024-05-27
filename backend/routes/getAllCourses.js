const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post('/getAllCourses', auth, roleCheck(["Learner"]), (req, res)=> {

    //getting courses from newest to oldest
    const query = `SELECT *
    FROM course
    ORDER BY created_at DESC`

    mysql.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }else{
            res.status(200).json({result})
        }
    })  
})

module.exports = router