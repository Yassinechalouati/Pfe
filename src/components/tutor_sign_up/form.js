import Orline from "../Global/Or_line";
import MailSignup from "./mailSignup";
import Title from "./title";
import { useDispatch } from "react-redux"; 
import { useSelector } from "react-redux";
import { setError, setIsLoading, setIsVerified } from '../../state/slices/tutorSlice'
import Loading from '../Global/Loading'
import axios from "axios";
import io from 'socket.io-client'
import {useRef} from 'react'
import TutorFields from './fields'
import SignUpButton from "./SignUpButton";


export default function Form() {
    //getting tutor Data from store 
    const tutorData = useSelector(state => state.tutorData)

    //initializing the tool to change the tutor data on the redux store
    const dispatch = useDispatch()

    //using socket io
    const socket = useRef(null)


    //sign up 
    const handleRegularSignup = async (e) => {
        e.preventDefault()
        try {
            dispatch(setIsLoading(true))
            const response = await axios.post('http://localhost:5000/tutor/regsignup', {
                email: tutorData.email, 
                pword: tutorData.password
            })
            console.log(response)

            //using websocket to detect when the user pressed the verification link sent to his email 
            socket.current = io('http://localhost:5000') 
            socket.current.emit('createRoom', `users_${tutorData.email}`) //joining room 

            //setting listener for when the user verified his email
            socket.current.on('emailVerified', (data) => {
                console.log('Email verification status:', data);  
                dispatch(setIsVerified(true))
                //saving tokens in localstorage
                localStorage.setItem('accesstoken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
                socket.current.disconnect(); // Disconnect the socket to avoid memory leaks
            })

            //listening for errors in the verification process
            socket.current.on('emailVerificationFailed', (error) => {
                dispatch(setError(error.message))
                socket.current.disconnect(); // Disconnect the socket
            })
            
        }catch(err) {
            dispatch(setError(err.response.data.message))
            console.log(err);
        }finally{
            dispatch(setIsLoading(false))
        }
    }


    return (
        <form onSubmit={handleRegularSignup} className="h-full flex flex-col justify-center space-y-4 items-center w-full sm:w-[50%] md:w-[50%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%] px-10">
            {
                tutorData.isLoading? 
                <Loading></Loading>
                :
                <>
                    <Title></Title> 
                    <MailSignup></MailSignup>
                    <Orline width="10%"></Orline>
                    <TutorFields></TutorFields>
                    <SignUpButton></SignUpButton>
                    <span className="text-darkg text-base">Already have an account? <span className="cursor-pointer text-button"> Log in</span></span>
                </>
            }
        </form >
    );
    
}

