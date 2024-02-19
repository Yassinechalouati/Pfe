import { useState} from 'react';
import axiosInstance from '../../interceptors/axiosInterceptor';

function ProfilePictureUploader() {
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0]
        console.log(imageFile)
        const formData = new FormData()
        formData.append('image', imageFile)
    
        try {
            const response = await axiosInstance.post('http://localhost:5000/imageFaceDetection', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    
    
    console.log(errorMessage);
    return (
        <div className="profile-picture-uploader">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default ProfilePictureUploader;
