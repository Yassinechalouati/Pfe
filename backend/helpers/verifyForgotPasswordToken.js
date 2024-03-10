const jwt = require('jsonwebtoken')

//verifying the forgotpassword token sent by the client 
const verifyForgotPassword = (forgotPasswordToken) => {
    const privateKey = process.env.FORGOTPASSWORD_TOKEN_SECRET
    
    return new Promise((resolve, reject) => {
        jwt.verify(forgotPasswordToken, privateKey, (err, tokenDetails) => {
            if (err) {
                //if the refresh token isn't valid, return error
                return reject({message: "Invalid verification Token"})
            }else {
                //if the token is valid return Valid
                resolve({
                    tokenDetails, 
                    message:"Valid verification Token"
                })
            }
        })
    })
}

module.exports = verifyForgotPassword