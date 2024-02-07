require("dotenv").config();
const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const mysql= require('../helpers/Sql_connection')
const { OAuth2Client } = require('google-auth-library');
const {User} = require('./models/User')


const client = new OAuth2Client(CLIENT_ID)

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })

        const payload = ticket.getPayload()
        const userId = payload['sub']

        const user = await User.findOne({googleId: userId})

        if(!user) {
            throw new Error('User not found')
        }

    }catch(error) {
        console.error("Error verifying Google token:", error)
        throw error
    }
}

router.post('/signup', (req, res) => {

    mysql.query(' ', (err, result) =>{
        if(err) {
            console.log(err)
        }else {
            console.log(result[0])
        }
    })
})



module.exports = router


