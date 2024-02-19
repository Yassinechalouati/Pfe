const express = require('express')
const router = express.Router()
const faceapi = require('face-api.js')


router.post('/image/detect-face', async (req, res) => {
    if (!req.files || !req.files.image) {
        console.log("no image");
        return res.status(400).json({ error: 'Image file not provided' });
    }

    const imageFile = req.files.image;
    const imgData = Buffer.from(imageFile.data, 'binary');

    try {
        const img = await faceapi.bufferToImage(imgData.buffer);
        const detections = await faceapi.detectAllFaces(img);
        console.log("works");
        res.json({ message:detections });
    } catch (error) {
        console.error('Error detecting faces:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router