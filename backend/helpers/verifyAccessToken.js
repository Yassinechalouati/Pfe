const jwt = require('jsonwebtoken')

//verifying the access token sent by the client 
const verifyRefreshToken = (accessToken) => {
    const privateKey = process.env.ACCESS_TOKEN_SECRET
    
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, privateKey, (err, tokenDetails) => {
            if (err) {
                //if the refresh token isn't valid, return error
                return reject({message: "Invalid Access Token"})
            }else {
                //if the token is valid return Valid
                resolve({
                    tokenDetails, 
                    message:"Valid Access Token"
                })
            }
        })
    })
}

module.exports = verifyRefreshToken