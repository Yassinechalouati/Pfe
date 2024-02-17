import {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import io from 'socket.io-client'

function EmailVerif() {
    //getting the token from the url
    const param = useParams()
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)//to assure that we got the answer from the socket before displaying the html code 
    const socket = useRef(null)
    socket.current = io('http://localhost:5000')
    
    
    useEffect(()=> {
        console.log("useEffect");
        socket.current.on('connect', () => {
            console.log('Socket connected, ID:', socket.current.id);
            if(socket.current.id) {
                socket.current.emit('verifyEmail', param.token, socket.current.id)
                
                socket.current.on('emailVerified', (data) => {
                    setIsValid(true)
                    setIsLoading(false)
                    console.log(data.verified);
                    socket.current.disconnect();
                })
        
                //listening for errors in the verification process
                socket.current.on('emailVerificationFailed', (error) => {
                    console.log(error.verified);
                    setIsValid(false)
                    setIsLoading(false)
                    socket.current.disconnect();
                })
    
            } 
        });
    }, [])
    
    
    return (
        <div className="flex w-screen h-screen flex-col justify-center items-center space-y-2">
            {
                !isLoading?
                (isValid? 
                <>
                    <img src="/verified.png" alt="verified" className="object-cover h-44 w-44"></img>
                    <span className="text-black text-2xl font-bold">Email verified successfully</span>
                    <span className="text-darkg text-lg font-bold">You can go back to personalize your account.</span>
                   
                </>
                :
                <>
                    <img src="/erreur-404.png" alt="verified" className="object-cover h-44 w-44"></img>
                    <span className="text-black text-2xl font-bold">404 not found</span>
                </>)
                :
                ""
                
            }
                
        </div>
        
    );
}

export default EmailVerif;