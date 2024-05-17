import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {setPic} from '../../state/slices/userSlice'


function EditPfp(props) {
    const pictureRef = useRef(null)
    
    const [loading, setLoading] = useState(false)

    const [imageError, setImageError] = useState()

    const dispatch = useDispatch()

    const handleImageClick = (e) => {
        if(pictureRef.current){
            pictureRef.current.click()
        }
    }
    
    

    const handlePictureChange = async (event) => {
        const reader = new FileReader() 
        if (event.target.files.length > 0) {
            setLoading(true)
            const imageFile = event.target.files[0]
            console.log(imageFile)
            const formData = new FormData()
            formData.append('image', imageFile)
            //sending the image to server so that ai checks if it contains a face
            
            if(props.role ==="learner") {
                //send request to server to change picture

                reader.readAsDataURL(imageFile)
                reader.onload = () => {
                    dispatch(setPic(reader.result))
                }
                reader.onerror = error => {
                    const err = 'Cannot load image!'
                    //setImageError(err)
                    console.log("Error", error)
                }
            }else {
                /*try {
                    const response = await axiosInstance.post('http://localhost:5000/imageFaceDetection', formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                        }
                    });
                    //if the server responds with true then it contains a face else it doesn't so we show error 
                    if(response.data.message){
                        reader.readAsDataURL(imageFile)
                        reader.onload = () => {
                            dispatch(setDisplayableImage(reader.result))
                        }
                        reader.onerror = error => {
                            const err = 'Cannot load image!'
                            setImageError(err)
                            console.log("Error", error)
                        }
                    }
                    else {
                        const error = 'No face Detected'
                        setImageError(error)
                    }
                    } catch (err) {
                        if(err.response.data.message){
                            dispatch(setError(err.response.data.message))
                            setImageError(err.response.data.message)
                        }
                        console.log(err);
                    }
                    finally{
                        setLoading(false)
                    }*/
            }
        }
    }

    return (
        <div className="flex flex-col space-y-2 items-center">
            <img 
                onClick={handleImageClick}
                src={props.profilepicture} 
                alt="profilepicture" 
                referrerPolicy="no-referrer"
                className="cursor-pointer hover:opacity-60 transition-opacity duration-200 rounded-full min-w-28 min-h-28 w-28 h-28 object-cover"
            />
            <input type="file" onChange={handlePictureChange} ref={pictureRef} accept="image/*" className="hidden"/>
        </div>
    );
}

export default EditPfp;