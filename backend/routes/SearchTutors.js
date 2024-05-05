const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')

 
router.post('/SearchTutors', auth, roleCheck(["Learner"]), (req, res) => {
    const {
        page, 
        pageSize
    } = req.body

    console.log("req.body: ", req.body);

    const offset = (parseInt(page) - 1) * parseInt(pageSize)
    console.log("offset: ", offset);

 
    const query = "SELECT id, lastname, firstname, email, pfp, Country, tel, isConnected, Birthday, introductionVideo, description, teachingStyle, AboutMe, Languages, WorkExperience, Education, uuid FROM TUTOR LIMIT ?, ?"
    mysql.query(query, [offset, parseInt(pageSize)], (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).json({message: "Internal Servor Error"})
        }else if(result.length <=0) {
            console.log("no tutors");
            res.status(204).json({message:"No Tutors"})
        }
        else {
            console.log("tutors exist")
            console.log(result)
            
            const numberOfTutorsQuery = `SELECT COUNT(*) AS totalRows FROM tutor`
            mysql.query(numberOfTutorsQuery, (numberOfTutorsError, numberOfTutorsResult) => {
                if (numberOfTutorsError) {
                    console.log("error in searchTutors file specifically in numberOfTutorsErrorQuery", numberOfTutorsError);
                    res.status(500).json({message: "Internal Server Error"})
                }else {
                    console.log("totalRows: ", numberOfTutorsResult[0].totalRows);
                    res.status(200).json({tutorsNumber: numberOfTutorsResult[0].totalRows, tutorsList: result})
                }
            })
        }
    })
})


module.exports = router