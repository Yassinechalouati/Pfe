import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux";

function EmailVerif() {
    //getting the token from the url
    const param = useParams()
    const [isValid, setIsValid] = useState(false)

    const tutorData = useSelector(state => state.tutorData)

    console.log(tutorData)
    
    const  Verification = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/verify',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${param.token}`
                    }
                }
                )
                console.log(response.data.message);
                setIsValid(true)

        }catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        console.log("here");
        Verification()
    })
    
    
    return (
        <div className="flex w-screen h-screen flex-col justify-center items-center space-y-2">
            {
                isValid? 
                <>
                    <img src="/verified.png" alt="verified" className="object-cover h-44 w-44"></img>
                    <span className="text-black text-2xl font-bold">Email verified successfully</span>
                    <button type="submit" className={`bg-elements w-40 border flex justify-center items-center py-2 px-3 h-10 rounded-lg text-center font-semibold text-lg text-white hover:shadow`}>
                        <span className="text-base ">Proceed</span>
                    </button>
                </>
                :
                <>
                    <img src="/erreur-404.png" alt="verified" className="object-cover h-44 w-44"></img>
                    <span className="text-black text-2xl font-bold">404 not found</span>
                </>
                
            }
                
        </div>
        
    );
}

export default EmailVerif;