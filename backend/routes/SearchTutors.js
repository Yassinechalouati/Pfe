const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post('/SearchTutors', auth, roleCheck(["Learner"]), (req, res) => {
    const query = "SELECT id, lastname, firstname, email, pfp, Country, tel, isConnected, Birthday, introductionVideo, description, teachingStyle, AboutMe, Languages, WorkExperience, Education FROM TUTOR"
    mysql.query(query, (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).json({message: "Internal Servor Error"})
        }else if(result.length <=0) {
            console.log("no tutors");
            res.status(204).json({message:"No Tutors"})
        }
        else {
            console.log("tutors exist")
            res.status(200).json({message: result})
        }
    })
})


module.exports = router