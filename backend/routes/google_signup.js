const express = require('express');
const router = express.Router()
//const bcrypt = require('bcrypt');
const mysql= require('../helpers/Sql_connection')
const verifyGoogleToken = require('../helpers/googleTokenverif')


router.post('/googlesignup', async (req, res) => {
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')
    const token = req.headers.token
    if(token) {
        verifyGoogleToken(token)
        .then((payload) => {
            if (payload) {
                console.log('Token verified successfully');
                //verifying if the email already exists in the Database
                mysql.query('SELECT * FROM learner where email = ? ', [payload.email], (err, result) =>{
                    if(err) {
                        //if there is error in data base return error 
                        console.log(err)
                        res.status(404).json({message:"Database Error"})
                    }else {
                        //if the email doesn't exist insert it
                        if (result.length <= 0){
                            const query = "INSERT INTO learner(firstname, lastname, email, pword, pfp) VALUES (?, ?, ?, ?, ?)"
                            mysql.query(query, [payload.given_name, payload.family_name, payload.email, '', payload.picture], (err, result)=> {
                                if(err) {
                                    //if there is error in data base return error 
                                    console.log(err)
                                    res.status(404).json({message:"Database Error"})
                                }
                                else{
                                    //if the operation was succesful return success
                                    res.status(200).json({message:"Sign up succesfully"})
                                }
                            })
                        }
                        else {
                            //if the email exists return Error
                            console.log("user exists")
                            res.status(404).json({message:"Email already Signed up"})
                            //besh ngued el partie taa sign in lahne
                        }
                    }
                }) 
            } else {
                // if the token is invalid return error
                console.log('Token verification failed');
                res.status(404).json({message: "Token verification failed"})
            }
        })
        .catch((error) => {
            // if the token is invalid return error
            console.error('Error verifying Google token:', error)
            res.status(404).json({message:"Error verifying Google token"})
        });
    }else {
        //if the token is null return error
        console.log("no token given")
        res.status(404).json({message:"token error"})
    }

})



module.exports = router