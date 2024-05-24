const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')



router.post('/Like', auth, roleCheck(["Learner"]), (req, res) => {
    const {
        tutorId,
        action
    } = req.body

    const userId = req.user.id

    let query 
    if(action === "Like"){
        
        query = "insert into likedtutors(learnerId, tutorId) value(?, ?)"
    }  
    else if(action ==="Dislike"){

        query = `delete from likedTutors where learnerId= ? and tutorId=?`                                                                                                                      =`insert into likedtutors(learnerId, tutorId) value(?, ?)`
    }

    mysql.query(query, [userId, tutorId], (err, result)=> {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json({message: "Liked"})
        }
    })
})

module.exports = router