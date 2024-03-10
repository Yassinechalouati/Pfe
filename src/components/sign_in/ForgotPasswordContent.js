import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function ForgotPasswordContent(props) {
    const navigate = useNavigate()

    const [email, setEmail]= useState("")


    //handling the reset call to backend server 
    const handleReset =(e) => {
        e.preventDefault()
        console.log("resetting");
    }
    
    //handling the email input from the user
    const handleEmailChange =(e) => {
        setEmail(e.target.value)
    }

    console.log(email);
    return (
        <>
            <img src="/forgotpword.png" alt="forgotpassword" className="w-24 h-24 self-center object-cover"></img>
            <div className="flex flex-col space-y-1 justify-center w-full items-center">
                <span className="text-xl font-bold self-center">Trouble Logging In?</span>
                <span className="text-sm text-center self-center">Enter your email address below, if we have it on file, we will send you a reset email.</span>
            </div>
            <div className="w-full">
                <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                <input
                    className="shadow mb-2 text-sm appearance-none border rounded-lg w-full h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    placeholder="Email"
                />
                <span className={`text-elements text-sm`}> Email Sent Successfully !</span>
            </div>
            <div className="flex space-x-3 self-center">
                    <button onClick={handleReset} type="submit" className={`bg-button border border-button flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-white hover:shadow`}>Reset</button>
                    <NavLink to={`/${props.firstSegment}/signup`} className={`bg-backg  border border-button flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-button hover:shadow`}>Signup</NavLink>
            </div>
            <div className="text-center">
                <p>Return to <NavLink to={`/${props.firstSegment}/signin`} className="text-blue-500 underline">Login</NavLink></p>
            </div>
        </>
    );
}

export default ForgotPasswordContent;