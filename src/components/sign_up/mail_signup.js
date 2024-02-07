import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import {setGoogleToken} from '../../state/userSlice'


export default function Mail() {
    
    //handle sign up via google
    const handleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try{
                setGoogleToken(response.access_token)
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo", {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`
                        }
                    }
                )
                console.log(res)
            }catch(err) {
                console.log(err)
            }

        },
      });
    return(
        <div onClick={handleLogin} className="w-full cursor-pointer p-2 flex justify-center hover:shadow items-center space-x-3 border border-[#E5E5E5] rounded-xl">
                <FcGoogle size="23" />
                <span className="font-semibold text-sm">Sign up with Google</span>
        </div> 
    );

}