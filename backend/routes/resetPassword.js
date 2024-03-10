const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const verifyForgotPassword = require('../helpers/verifyForgotPasswordToken')
const bcrypt = require('bcrypt')



router.post('/resetpassword', async (req, res) => {
    const {password} = req.body
    if (!password || !req.headers.authorization ) {
        res.status(400).json({message: "either the token or the password is not provided"})
    }

    const forgotPasswordToken = req.headers.authorization.split(' ')[1]
    
    verifyForgotPassword(forgotPasswordToken)
        .then((response) => {
            bcrypt.hash(password, 10)
            .then(hash => {
                const updateQuery = `update ? set pword = ? where id = ? `
                mysql.query(updateQuery, [response.role, hash, response.id], (err, result) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json({message: "Internal Server Error"})
                    }else {
                        res.status(200).json({role: response.role, message:"Password updated"})
                    }
                })
            })

            res.status(200).json({message:"token verified"})
        })
        .catch((err)=> {
            console.log(err);
            res.status(400).json({message:"bad token"})
        })

})

module.exports = router