const express = require('express');
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const bcrypt = require('bcrypt');
const generateVerificationToken= require('../helpers/generateVerificationToken')
const sendEmail = require('../helpers/sendEmail')


router.post('/regsignup', (req, res) => {
    const email = req.body.email
    const pword = req.body.pword
    
    //checking if fields are not empty
    if(!email || !pword) {
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
                        const insertionQuery = 'INSERT INTO Tutor(email, pword, isVerified) VALUES(?, ?, 0)'
                        mysql.query(insertionQuery, [email, hash], async (err, result)=> {
                            //Checking whether there's an error in database or not 
                            if (err) {
                                console.log("query error: ", err)
                                res.status(500).json({message: "Internal Server Error"})
                            }
                            else {
                                
                                //if the operation was succesful return tokens
                                const userId = result.insertId
                                const user = {id: userId, role: "Tutor"}
                                
                                //making verification token
                                const {verificationToken} = await generateVerificationToken(user)
                                
                                //sending verification email to user 
                                const url = `${process.env.BASE_URL}users/verify/${verificationToken}`
                                //making the email beautiful
                                const emailHtml= `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; font-family: 'Nunito'; background-color: #F9F4F0;">
                                <table style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                    <tr>
                                        <td style="background-color: #F28585; padding:0; height: 85px; font-weight: bold; color: white; border-top-left-radius: 10px; border-top-right-radius: 10px; font-size: 25px; text-align: center;">Welcome to Elearning!</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: white; padding: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                                            <img src="https://i.imgur.com/n85QHTn.png" alt="confettis" style="display: block; margin: 0 auto; width: 200px; height: 200px;">
                                            <p style="margin-top: 50px; font-size: 19px; font-weight: bold; text-align: left;">Hey language enthusiast,</p>
                                            <p style="margin-top: 10px; color: #767676; font-size: 16px; text-align: left;">Welcome aboard 🌍, You're now part of our dynamic community of educators dedicated to shaping linguistic journeys. Your expertise will inspire learners and foster connections. Let's empower individuals to thrive in a world of diverse languages and cultures. Happy teaching! 📚🌟</p>
                                            <p style="margin-top: 35px; font-size: 16px; text-align: center;"><a href="${url}" target="_blank" style="padding: 10px 20px; background-color: #F28585; border-radius: 10px; text-decoration: none; color: white;">Verify Email</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </body>`
                                await sendEmail(email, "Email Verification", emailHtml)
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