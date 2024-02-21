const generateAccessToken = require("./generateAccessToken")
const generateRefreshToken = require("./generateRefreshToken")
const mysql = require('./Sql_connection')



const insertLearner = async(payload, res) => {
    const query = "INSERT INTO learner(firstname, lastname, email, pword, pfp, isVerified) VALUES (?, ?, ?, ?, ?, 1)"
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


module.exports = insertLearner