const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const verifyVerificationToken = require('../helpers/verifyVerificationToken')
const generateRefreshToken = require('../helpers/generateRefreshToken')
const generateAccessToken = require('../helpers/generateAccessToken')

//email verification 
router.post('/verify', (req, res) =>{
    //getting and verifying verfication token from the user
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    verifyVerificationToken(token)
    .then(({tokenDetails}) => {
        //if the user exists we make his account verified 
        const payload = {id: tokenDetails.id, role: tokenDetails.role}
        const query = `SELECT isVerified from ${mysql.escapeId(payload.role)} where id = ?`
        mysql.query(query, [payload.id], (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send({message: "Internal Server Error"})
            }else {
                if(result.length >0) {
                    //we test whether he's already verified or not 
                    
                    //unverfied user
                    if(result[0].isVerified !== 1) {
                        const verifQuery = `UPDATE ${mysql.escapeId(payload.role)} SET isVerified = 1 where id = ?`
                        mysql.query(verifQuery, [payload.id], async (err, result) => {
                            if(err) {
                                console.log(err);
                                res.status(500).send({message: "Internal Server Error"})
                            }
                            else {
                                //after verification we send him access and refresh tokens
                                const {accessToken} = await generateAccessToken(payload)
                                const {refreshToken} = await generateRefreshToken(payload)

                                console.log("Email verified");
                                res.status(201).json({message:"Email verified successfully", refreshToken: refreshToken, accessToken: accessToken})
                            }
                        })
                    }
                    else {
                        //user already verified
                        console.log("user Verified")
                        res.status(409).json({message:"User already verified"})
                    }
                }else {
                    console.log("Invalid link");
                    res.status(400).send({message: "Invalid link"})
                }
            }
        })

    })
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err)
    }
    )

})

module.exports = router