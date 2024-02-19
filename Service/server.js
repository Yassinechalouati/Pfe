require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const { loadFaceDetectionModel } = require('./helpers/loadFaceDetectionModel'); // Import the face detection service



const app = express();
console.log(process.env.PORT);
const PORT = process.env.PORT || 8080



app.use(express.json())
app.use(fileUpload())
app.use(cors({
    origin: process.env.SERVER_URL
}))

//assure that we get the body from the api calls 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Load face detection model asynchronously
loadFaceDetectionModel().then(() => {
    console.log('Face detection model loaded successfully.');
  }).catch(err => {
    console.error('Error loading face detection model:', err);
  });

//Routers 
const faceDetectionRouter = require('./routes/imageFaceDetection')

//apis
app.use('/service', faceDetectionRouter)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






