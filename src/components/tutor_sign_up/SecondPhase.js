import { useState, useRef} from 'react';
import axiosInstance from '../../interceptors/axiosInterceptor';
import { HiOutlineUpload } from "react-icons/hi";
import {setDescription} from '../../state/slices/tutorSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';


function ProfilePictureUploader() {
    //hook to change tutor Data in the slice
    const dispatch = useDispatch()

    //getting tutor Data from the store 
    const tutorData = useSelector(state => state.tutorData)

    //handling the image upload
    const pictureRef = useRef(null)
    const [image, setImage] = useState(null)

    const maxDescriptionLength = 150

    const handleImageChange = async (event) => {
        const reader = new FileReader() 
        if (event.target.files.length > 0) {
            const imageFile = event.target.files[0]
            console.log(imageFile)
            const formData = new FormData()
            formData.append('image', imageFile)
            //sending the image to server to ai check if it contains a face
            try {
                const response = await axiosInstance.post('http://localhost:5000/imageFaceDetection', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                });
                //if the server responds with success we display the picture 
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
    
    const handleDescriptionChange = (e) => {
        dispatch(setDescription(e.target.value))
    }
    return (
        <div className="w-full h-[80%] space-y-2 py-3 overflow-y-auto"> 
            <div className="rounded-xl flex flex-col h-[46%] m-auto w-[80%] md:w-[50%] relative">
                <div className="bg-button h-[50%] w-full rounded-t-xl"></div>
                <div className="bg-lightg w-full p-[13px] h-[50%] rounded-b-xl flex flex-col justify-end">
                    <span className="text-black font-bold">Your photo</span>
                    <span className="text-darkg text-sm">Click the picture to upload your own.</span>
                    <span className="text-darkg text-sm">Please ensure your face is visible.</span>
                </div>
                <img onClick={handleSelectedImage} src={image? image: '/user.png'} alt="user" className="absolute cursor-pointer bg-button2 top-1/2 object-cover border-2 border-backg left-3 transform -translate-y-1/2 h-20 w-20 rounded-full "></img>
                <input type="file" onChange={handleImageChange} ref={pictureRef} accept="image/*" className="hidden"/>
            </div>
            <div className="rounded-xl h-[75%] m-auto flex flex-col space-y-3 p-[13px] bg-lightg w-[80%] md:w-[50%]">
                <div className="w-full cursor-pointer h-full bg-backg border-dashed rounded-xl border flex justify-center items-center border-black">
                    <HiOutlineUpload color="#767676" size="40"></HiOutlineUpload>
                </div>
                <span className="text-darkg text-sm flex justify-center items-center">
                    Please upload a video introducing yourself or promoting your expertise. This will help learners connect with you and gain insight into your teaching style and personality.
                </span>
            </div>
            <div className="w-[80%] md:w-[50%] h-[30%] flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
                <span className="text-black font-bold h-[15%]"> Description: </span>
                <div className="relative h-[85%] w-full">
                    <textarea onChange={handleDescriptionChange} value={tutorData.description} className="w-full resize-none outline-none h-full rounded-xl p-2 text-sm" maxLength={maxDescriptionLength} placeholder='Start with a friendly hello and introduce yourself to students! Your introduction will be the initial impression they get when browsing through their tutor matches...'></textarea>
                    <span className="bottom-0 absolute text-sm right-3 ">{tutorData.description.length}/{maxDescriptionLength}</span>
                </div>
            </div>
        </div>
    );
}

export default ProfilePictureUploader;
