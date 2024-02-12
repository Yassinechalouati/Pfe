const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')

router.post('/personalize', auth, roleCheck(["Learner"]), (req, res) => {
    const language_proficiency = req.body.language_proficiency
    if(language_proficiency) {
        const userId = req.user.id
        const query = 'UPDATE learner SET language_proficiency = ? where id = ?'
        mysql.query(query, [language_proficiency, userId], (err, result) => {
            if(err) {
                res.status(500).json({message: "Internal Server Error"})
            }else {
                res.status(201).json({message: "Updated Successfully"})
            }
        })
    }
})

module.exports = router