require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');

//port
const port = process.env.PORT || 5000

//specifying the limit of requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))


app.use(cors({
    origin: "http://localhost:3000"
}))


//assure that we get the body from the api calls 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

//getting exported routers 
const googleSignupRouter = require('./routes/google_signup')
const regularSignupRouter = require('./routes/regular_signup')
const refreshTokenRouter = require('./routes/refreshToken')
const detailsRouter = require('./routes/learnerDetails')
const personalizeRouter = require('./routes/presonalize')
const beginRouter = require('./routes/begin')
const tutorGoogleSignUp = require('./routes/tutor_google_signup')
const tutorRegularSignupRouter = require('./routes/tutor_Regular_signup')

//apis
app.use('/', googleSignupRouter)
app.use('/', regularSignupRouter)
app.use('/api/refreshToken', refreshTokenRouter)
app.use('/', detailsRouter)
app.use('/', personalizeRouter)
app.use('/', beginRouter)
app.use('/tutor', tutorGoogleSignUp)
app.use('/tutor', tutorRegularSignupRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });