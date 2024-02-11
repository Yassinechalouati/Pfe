import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import {setSignUpStep} from '../../state/slices/userSlice'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { setError } from "../../state/slices/errorSlice";


export default function Mail() {
    //step index
    const step = useSelector((state) => state.userData.signupStep)

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()
    
    //handle sign up via google
    const handleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try{
                //send post request with google token in header
                const resp = await axios.post(
                    'http://localhost:5000/googlesignup',
                    {},
                    {
                        headers: {
                            token: response.access_token
                        }
                    }
                )
                localStorage.setItem('refreshtoken', resp.headers['refreshtoken'])
                localStorage.setItem('accesstoken', resp.headers['accesstoken'])
                dispatch(setSignUpStep(step<2? step + 1: step))
            }catch(err) {
                dispatch(setError(err.response.data.message))
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