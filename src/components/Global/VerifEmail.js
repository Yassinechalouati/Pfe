import { MdMarkEmailRead } from "react-icons/md";
import { useDispatch } from "react-redux";
import {  setVerificationTutor, setIsVerified as setTutorVerified, setError as setLearnerError } from "../../state/slices/tutorSlice"
import {  setVerificationLearner, setIsVerified as setLearnerVerified, setError as setTutorError} from "../../state/slices/userSlice"
import { useRef, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

function VerifEmail({role, user}) {

    const dispatch = useDispatch()

    const socket = useRef(null)

    //control the disability of the resend button
    const [resendDisabled, setResendDisabled] = useState(false)
    
    
    const timeoutDuration = 60000


    
    //button to return to the form in case the verification process took too much or the user wants to sign up again with another account
    const handleBack =() => {
        console.log(role);
        if(role ==="Learner") {
            dispatch(setVerificationLearner(false))
        }else if (role === "Tutor") {
            dispatch(setVerificationTutor(false))
        }
    }

    //button to resend the verification email in case the previous email was not sent
    const handleResend = async () => {
        try {
            // If the button is disabled, return early
            if (resendDisabled) return

            // if the role is not learner nor tutor then don't proceed
            if (role !== 'Learner' && role !== 'Tutor') return

             // Disable the button to prevent multiple clicks
            setResendDisabled(true);

            // Wait for 1 minute (60000 milliseconds) before enabling the button again
            setTimeout(() => {
                setResendDisabled(false);
            }, timeoutDuration);
            
            const response = await axios.post('http://localhost:5000/resend/verification_link', {
                email: user.email,
                role : role
            })
            console.log(response.data)
            //using websocket to detect when the user pressed the verification link sent to his email 
            socket.current = io('http://localhost:5000') 
            socket.current.emit('createRoom', `users_${user.email}`) //joining room 

            if (role ==='Learner') {
                //setting listener for when the learenr verified his email
                socket.current.on('emailVerified', (data) => {
                    dispatch(setLearnerVerified(true))
                    dispatch(setVerificationLearner(false))//handling the email sent ui 
                    console.log(user.isVerified)
                    socket.current.disconnect(); // Disconnect the socket to avoid memory leaks
                })
    
                //listening for errors in the verification process
                socket.current.on('emailVerificationFailed', (error) => {
                    dispatch(setVerificationLearner(false))//handling the email sent ui 
                    dispatch(setLearnerError(error.message))
                    socket.current.disconnect(); // Disconnect the socket
                })
            }
            else {
                //setting listener for when the tutor verified his email
                socket.current.on('emailVerified', (data) => {
                    dispatch(setTutorVerified(true))
                    dispatch(setVerificationTutor(false))//handling the email sent ui 
                    
                    socket.current.disconnect(); // Disconnect the socket to avoid memory leaks
                })
    
                //listening for errors in the verification process
                socket.current.on('emailVerificationFailed', (error) => {
                    dispatch(setVerificationTutor(false))//handling the email sent ui 
                    dispatch(setTutorError(error.message))
                    socket.current.disconnect(); // Disconnect the socket
                })
            }
        }catch(err) {
            if(role === 'Learner'){
                dispatch(setLearnerError('Error please try again later!'))
            }else {
                dispatch(setTutorError('Error please try again later!'))
            }
            console.log(err);
        }
    }

    
    //handling the color opacity when the button is disabled

    const handleColorOpacity =() => {
        if(resendDisabled) {
            return 'opacity-60'
        }
        else {
            return 'opacity-100'
        }
    }
    
    return (
        <div className="flex flex-col justify-center items-center h-full w-full space-y-2">
            <div className="bg-elements w-24 h-24 rounded-full flex justify-center items-center">
            <MdMarkEmailRead color="white" size="50"/>

            </div>
            <span className="text-base font-bold text-center">Email Verification Sent</span>
            <span className="text-sm text-darkg text-center">Check your inbox. If it's not there, please also check your spam folder.</span>
            <span className="text-sm text-darkg text-center">Upon verification, you will be seamlessly progressed to the next stage.</span>
            <div className="flex w-full items-stretch justify-evenly ">
                <button type="button" onClick={handleBack} className={`bg-lightbutton border border-elements flex justify-center items-center  self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-elements hover:shadow`}>
                    <span className="text-sm ">Go back</span>
                </button>
                <button type="button" disabled={resendDisabled} onClick={handleResend} className={`bg-elements ${handleColorOpacity()} flex justify-center items-center self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white hover:shadow`}>
                    <span className="text-sm ">Resend</span>
                </button>
            </div>
            {
                resendDisabled?
                <span className="text-sm text-errortext text-center">Wait 1 minute before resending. Cool down and start counting.</span>
                :
                null
            }

        </div>
    );
}

export default VerifEmail;