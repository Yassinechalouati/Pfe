import {useDispatch, useSelector} from 'react-redux'
import { setEmail, setPassword, setConfpass, setPic } from '../../state/userSlice';
import {useRef} from 'react'

export default function Fields() {
    //getting userData from the store
    const userData = useSelector((state) => state.userData )

    //the image reference
    const picRef = useRef(null)

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    //handling the email field when typing
    const handleEmailChange =(e) => {
        dispatch(setEmail(e.target.value))
    }
    
    //handling the password field when typing
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value))
    }

    //handling the confirm password field when typing 
    const handleConfirmPasswordChange = (e) => {
        dispatch(setConfpass(e.target.value))
    }

    //handling the insertion of the image
    const handleImageChange = (event)=> {
        var reader = new FileReader() 
        if (event.target.files.length > 0) {
          reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
            dispatch(setPic(reader.result))
        }
        reader.onerror = error => {
          console.log("Error", error)
        }
        }
        else {
          dispatch(setPic(""))
        }
    }

    //clicking to set the image
    const handleImageClick = () => {
        picRef.current.click()
    }

    //displaying selected image
    const handleSelectedImage = () => {
        if (userData?.pic !== "" && userData?.pic !== null) {
            return <img 
            src={userData?.pic} 
            alt="pfp" 
            className="h-14 w-14 object-cover cursor pointer rounded-full" 
        />;
        } else {
            return <img 
            src="user.png" 
            alt="pfp" 
            className="h-14 w-14 object-cover cursor pointer rounded-full" 
        />
        }
    }

    return(
        <div className="w-full flex flex-col space-y-5 items-center">
            <div onClick= {handleImageClick} className="flex flex-col items-center cursor-pointer">
                {
                    handleSelectedImage()
                }
                <span className="text-darkg text-sm font-semibold">Upload your profile picture</span>
                <input className="hidden" type="file" ref={picRef} accept="image/*" onChange={handleImageChange}></input>
            </div>
            <div className="flex w-full justify-between">
                <div className="w-[30%]">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        value = {userData?.email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                    />
                </div>
                <div className="w-[30%]">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                    <input
                        className="shadow text-sm rounded-lg appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value = {userData?.password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                    />
                </div>
                <div className="w-[30%]">   
                    <label className="block text-[#000] text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value = {userData?.confpass}
                        pattern= {userData?.password}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                    />
                </div>
            </div>
        </div>
    )
}