const express = require('express');
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const bcrypt = require('bcrypt');
const generateVerificationToken = require('../helpers/generateVerificationToken')
const sendEmail = require('../helpers/sendEmail')


router.post('/regular_signup', (req, res) => {
    const email = req.body.email
    const pword = req.body.pword
    const pfp = req.body.pfp
    
    //checking if fields are not empty
    if(!email || !pword || !pfp) {
        res.status(400).json({message: "one or more fields are empty. Please fill our the whole form"})
    }
    else {
        //checking if the email already exists in the Database or not 
        
        const query = 'select email from learner where email = ? UNION select email from Tutor where email = ?'
        mysql.query(query, [email, email], (err, result) => {
            //Checking whether there's an error in database or not 
            if (err) {
                res.status(500).json({message: "Internal Server Error"})
            }
            else {
                //checking whether the user already signed up or not 
                if (result.length > 0 ) {
                    res.status(409).json({message: "Email Already Signed Up"})
                }else{
                    //creating account if there's no user with the same email
                    //hashing the password before the insertion in the database
                    bcrypt.hash(pword, 10)
                    .then(hash => {
                        const insertionQuery = 'INSERT INTO LEARNER(email, pword, pfp, isVerified) VALUES(?, ?, ?, 0)'
                        mysql.query(insertionQuery, [email, hash, pfp], async (err, result)=> {
                            //Checking whether there's an error in database or not 
                            if (err) {
                                console.log("query error: ", err)
                                res.status(500).json({message: "Internal Server Error"})
                            }
                            else {
                                //if the operation was succesful return tokens
                                const userId = result.insertId
                                const user = {id: userId, role: "Learner"}

                                //making verification token
                                const {verificationToken} = await generateVerificationToken(user)
                                
                                //sending verification email to user 
                                const url = `${process.env.BASE_URL}users/verify/${verificationToken}`
                                await sendEmail(email, "Email Verification", url)
                                res.status(201).json({message: "Email sent", roomId: `users_${email}`}) 
                            }
                        })
                    })
                    .catch(error => {
                        console.error('Error hashing password:', error);
                        res.status(500).json({message: "Internal Server Error"})
                    })  
                    
                }
            }
        })
    }
    

})


module.exports = router