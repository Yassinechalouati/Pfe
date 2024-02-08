const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');

//server port
const port = 5000

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


const signupRouter = require('./routes/google_signup')

app.use('/', signupRouter)


app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });