const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const verifyVerificationToken = require('../helpers/verifyVerificationToken')

router.get('/verify', (req, res) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    verifyVerificationToken(token)
    .then(({tokenDetails}) => {
        const payload = {id: tokenDetails.id, role: tokenDetails.role}
        const query = 'SELECT email from ? where id = ?'
        mysql.query(query, [payload.role, payload.id], (err, result) => {
            if(err) {
                res.status(500).send({message: "Internal Server Error"})
            }else {
                if(result.length >0) {
                    const verifQuery = 'UPDATE ? SET isVerfied = 1 where id = ?'
                    mysql.query(verifQuery, [payload.role, payload.id], (err, result) => {
                        if(err) {
                            res.status(500).send({message: "Internal Server Error"})
                        }
                        else {
                            if(result.length > 0){
                                res.status(200).send({message:"Email verified successfully"})
                            }
                            else {
                                console.log("query Ghalta");
                            }
                        }
                    })
                }else {
                    res.status(400).send({message: "Invalid link"})
                }
            }
        })

    })
    .catch((err)=> res.status(400).json(err))

})

module.exports = router