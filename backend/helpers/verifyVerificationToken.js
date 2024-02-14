const jwt = require('jsonwebtoken')

//verifying the refresh token sent by the client 
const verifyVerificationToken = (verificationToken) => {
    const privateKey = process.env.VERIFICATION_TOKEN_SECRET
    
    return new Promise((resolve, reject) => {
        jwt.verify(verificationToken, privateKey, (err, tokenDetails) => {
            if (err) {
                //if the refresh token isn't valid, return error
                return reject({message: "Invalid Refresh Token"})
            }else {
                //if the token is valid return Valid
                resolve({
                    tokenDetails, 
                    message:"Valid refresh Token"
                })
            }
        })
    })
}

module.exports = verifyVerificationToken