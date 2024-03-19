require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
  }
});


// Middleware for parsing multipart/form-data
app.use(cors({
    origin: "http://localhost:3000"
}))

//port
const port = process.env.PORT || 5000

//specifying the limit of requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))




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
const resendVerificationRouter = require('./routes/resendVerification')
const imageFaceDetectionCallRouter = require('./routes/imageFaceDetectionCall')
const regularLoginRouter = require('./routes/regular_login')
const googleLoginRouter = require('./routes/googleLogin')
const speedTestRouter = require('./routes/speedTest')
const personalizationRouter = require('./routes/saveTutorPersonalization')
const tutorSearchRouter = require('./routes/SearchTutors')
const getFiles = require('./middleware/Files')
const forgotpassword = require('./routes/forgotPassword')
const verifyForgotPassword = require('./routes/verifyForgotPasswordToken')
const resetpassword = require('./routes/resetPassword')
const tutorDetails = require('./routes/tutorDetails')

//apis
app.use('/', googleSignupRouter)
app.use('/', regularSignupRouter)
app.use('/api/refreshToken', refreshTokenRouter)
app.use('/learner', detailsRouter)
app.use('/', personalizeRouter)
app.use('/', beginRouter)
app.use('/tutor', tutorGoogleSignUp)
app.use('/tutor', tutorRegularSignupRouter)
app.use('/resend', resendVerificationRouter)
app.use('/', imageFaceDetectionCallRouter )
app.use('/', regularLoginRouter)
app.use('/', googleLoginRouter)
app.use('/', speedTestRouter)
app.use('/tutor', personalizationRouter)
app.use('/', tutorSearchRouter)
app.use('/', getFiles)
app.use('/', forgotpassword)
app.use('/', verifyForgotPassword)
app.use('/', resetpassword)
app.use('/tutor', tutorDetails)


// Socket.io logic
require('./helpers/socketHandler')(io);



server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  }); 