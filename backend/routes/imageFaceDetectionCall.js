const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const axios = require('axios')


router.post('/imageFaceDetection', auth, roleCheck(["Tutor"]), async (req, res) => {
    console.log(req);
    if (!req.files || !req.files.image) {
        console.log("error fichier server 1");
        return res.status(400).json({ error: 'Image file not provided' });
    }

    const imageFile = req.files.image;

    try {
        const formData = new FormData(); // Create a Blob from image file data
        formData.append('image', new Blob(imageFile.data, { type: 'application/octet-stream' }), {filename: imageFile.name});
        const response = await axios.post('http://localhost:4000/service/image/detect-face', formData,
        )
        console.log(response);
        res.status(200).json({message: response.data.message})
    }catch(err) {
        console.log("service server error: ",err)
        res.status(500).json({message: "Internal Server Error"})
    }

})

module.exports = router