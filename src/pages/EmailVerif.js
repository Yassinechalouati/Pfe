import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import {NavLink, useParams} from 'react-router-dom'

function EmailVerif() {
    //getting the token from the url
    const param = useParams()
    
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)//to assure that we got the answer from the socket before displaying the html code 
    
    
    useEffect(()=> {
        const verifyEmail =  async () => {
            try {
                const response = await axios.post('http://localhost:5000/user/verifEmail', {

                },{
                    headers: {
                        'Authorization': `Bearer ${param.token}`
                    }
                })
                //showing that the verification succeeded
                setIsValid(true)
                setIsLoading(false)
                //update localStorage with tokens
                localStorage.clear();
                localStorage.setItem('accesstoken', response.data.accessToken)
                localStorage.setItem('refreshtoken', response.data.refreshToken)
            }catch(err){
                console.log(err)
                //showing that the link is invalid
                setIsValid(false)
                setIsLoading(false)
            }
        }
        verifyEmail()
    }, [])
    

    
    return (
        <div className="flex w-screen h-screen flex-col justify-center items-center space-y-2">
            {
                !isLoading?
                (isValid? 
                <>
                    <img src="/verified.png" alt="verified" className="object-cover h-44 w-44"></img>
                    <span className="text-black text-2xl font-bold">Email verified successfully</span>
                    <NavLink to='/learner/signup/personalize' className="rounded-md py-2 px-4 bg-lightGreen text-elements font-bold">Proceed</NavLink>
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