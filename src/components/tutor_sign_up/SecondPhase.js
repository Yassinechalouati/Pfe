import { useState, useRef, useEffect} from 'react';
import axiosInstance from '../../interceptors/axiosInterceptor';

function ProfilePictureUploader() {

    const pictureRef = useRef(null)
    const [image, setImage] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = async (event) => {
        const reader = new FileReader() 
        if (event.target.files.length > 0) {
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
                reader.readAsDataURL(imageFile)
                reader.onload = () => {
                  setImage(reader.result)
                }
                reader.onerror = error => {
                    console.log("Error", error)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    const handleSelectedImage = () => {
        pictureRef.current.click()
    }
    
    useEffect(() => {
        console.log(image)
    }, [image])
    return (
        <div className="w-full h-full flex flex-col items-center space-y-3 p-10"> 
            <span className="text-xl font-bold text-black">Introduction</span> 
            <span className="text-sm text-black max-w-[55%]"> Let's Get to Know You! Share your personality and expertise by uploading a profile picture and an introduction video. This is your chance to make a memorable first impression!</span>
            <div className="flex flex-col space-y-1 items-center">
                <img onClick={handleSelectedImage} src={image? image: '/user.png'} className="w-20 bg-red-200 rounded-full h-20 object-cover"></img>
                <span className="text-sm text-darkg max-w-[55%]">Click on the profile picture to upload a new one.</span>
            </div>
            <input type="file" onChange={handleImageChange} ref={pictureRef} accept="image/*" className="hidden"/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default ProfilePictureUploader;
