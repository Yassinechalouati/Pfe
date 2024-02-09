const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');

//server port
const port = 5000

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

//apis
app.use('/', googleSignupRouter)
app.use('/', regularSignupRouter)




app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });