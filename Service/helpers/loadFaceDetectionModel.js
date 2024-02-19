const faceapi = require('face-api.js');

async function loadFaceDetectionModel() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('models');
}

module.exports = { loadFaceDetectionModel };