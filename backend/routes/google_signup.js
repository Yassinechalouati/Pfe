const express = require('express');
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const verifyGoogleToken = require('../helpers/googleTokenverif')
const generateRefreshToken = require('../helpers/generateRefreshToken')
const generateAccessToken = require('../helpers/generateAccessToken')


router.post('/googlesignup', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if(token) {
        verifyGoogleToken(token)
        .then((payload) => {
            if (payload) {
                console.log('Token verified successfully');
                //verifying if the email already exists in the Database
                mysql.query('SELECT * FROM learner where email = ? ', [payload.email], (err, result) =>{
                    if(err) {
                        //if there is error in database return error 
                        console.log(err)
                        res.status(500).json({message:"Internal Server Error"})
                    }else {
                        //if the email doesn't exist insert it
                        if (result.length <= 0){
                            const query = "INSERT INTO learner(firstname, lastname, email, pword, pfp) VALUES (?, ?, ?, ?, ?)"
                            mysql.query(query, [payload.given_name, payload.family_name, payload.email, '', payload.picture], async (err, result)=> {
                                if(err) {
                                    //if there is error in data base return error 
                                    console.log(err)
                                    res.status(500).json({message:"Internal Server Error"})
                                }
                                else{
                                    //if the operation was succesful return tokens
                                    const userId = result.insertId
                                    const user = {id: userId, role: "Learner"}

                                    const {accessToken} = await generateAccessToken(user)
                                    const {refreshToken} = await generateRefreshToken(user)
                                    
                                    res.status(201).json({message:"Signed up succesfully", refreshToken: refreshToken, accessToken: accessToken})
                                }
                            })
                        }
                        else {
                            //if the email exists return Error
                            console.log("user exists")
                            res.status(409).json({message:"Email Already Signed Up"})
                        }
                    }
                }) 
            } else {
                // if the token is invalid return error
                console.log('Token verification failed');
                res.status(400).json({message: "Token verification failed"})
            }
        })
        .catch((error) => {
            // if the token is invalid return error
            console.error('Error verifying Google token:', error)
            res.status(400).json({message:"Error verifying Google token"})
        });
    }else {
        //if the token is null return error
        console.log("no token given")
        res.status(400).json({message:"no token given"})
    }

})



module.exports = router