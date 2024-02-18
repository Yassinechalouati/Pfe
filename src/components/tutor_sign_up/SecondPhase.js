/*import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

function ProfilePictureUploader() {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log("here");
        // Load face detection model when component mounts
        async function loadFaceDetectionModel() {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        }
        loadFaceDetectionModel();
    }, []); // Empty dependency array ensures this effect runs only once

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        
        if (imageFile) {
            const image = await faceapi.bufferToImage(imageFile)
            console.log("Before detections");
            const detections = await faceapi.detectAllFaces(image)
            console.log("detections: ", detections);
            if (detections.length === 0) {
                setErrorMessage('Error: No face detected in the image. Please upload a picture with your face visible.');
            } else {
                setErrorMessage('');
                // Proceed with profile picture submission
            }
        }
    };
    
    console.log(errorMessage);
    return (
        <div className="profile-picture-uploader">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default ProfilePictureUploader;
*/