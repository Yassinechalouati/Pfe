const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const upload = require('../middleware/fileUploads')


router.post('/CreateCrouse', auth, roleCheck(["Tutor"]), upload.fields([{ name: 'courseFile', maxCount: 20 }]), (req, res) => {
    
    const courseFileName = req.files['courseFile'][0].filename
    const tutorId= req.user.id

    const {
        title,
        category,
        language,
        level,
        type,
        description,
        numberOfpages,
        courseCover
    } = req.body

    const query = `INSERT INTO course(tutorId, title, Category, Language, Level, Type, description, numberOfpages, Course, courseCover)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    mysql.query(query, [tutorId, title, category, language, level, type, description, numberOfpages, courseFileName, courseCover], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json({message: result.insertId, fileName: courseFileName})
        }
    })
})

module.exports = router