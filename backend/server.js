const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors({
    origin: "http://localhost:3000"
}))


const signupRouter = require('./routes/signup')

app.use('/', signupRouter)

const port = 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });