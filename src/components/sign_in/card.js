import MailSignIn from "./mail_signin";
import Normal from "./normal_signin";
import axios from 'axios'
import { useSelector } from "react-redux";
import { setTutorError, setLearnerError } from "../../state/slices/loginSlice";
import { useDispatch } from "react-redux";
import Errorpop from "../Global/Error_popup";
import Logo from "./logo_welcome_text";

function CardSignIn(){
    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const loginData = useSelector(state => state.loginData)
    
    const dispatch = useDispatch()

    //sending request to the api to login with user's credentials
    const handleLogin = async (e) => {
        e.preventDefault()
        if(loginData.email && loginData.password) {
            try {
                const response = await axios.post('http://localhost:5000/regularLogin', {
                    email: loginData.email, 
                    password: loginData.password, 
                    information: firstSegment //telling whether it's a learner or tutor
                })
                console.log(response);
            }catch(err) {
                if(firstSegment === 'learner'){
                    dispatch(setLearnerError(err.response.data.message))
                }
                else if (firstSegment === 'tutor') {
                    dispatch(setTutorError(err.response.data.message))
                }

                console.log(err)
            }
        }
    }

    //based on the page we send either the error of the learner page or the tutor page 
    const handleErrorValue = () => {
        if(firstSegment === 'learner') {
            return loginData.learnerError
        }else {
            return loginData.tutorError
        }
    }

    //based on the page we send either the function that sets the user page or the tutor page 
    const handleSetError = () => {
        if (firstSegment === 'learner') {
            return setLearnerError
        }
        else {
            return setTutorError
        }
    }
    
    return (
        <form onSubmit={handleLogin} className="bg-white relative rounded-3xl shadow-lg px-6 py-2 justify-center flex flex-col space-y-7 w-[97%] md:w-[30%] lg:w-[25%] h-[90%]">
            <Logo></Logo>
            <MailSignIn></MailSignIn>
            <div className="flex w-full justify-center items-center">
                <hr className="h-1 w-[47%] "></hr>
                <span className="w-[6%] text-center text-darkg">OR</span>
                <hr className="h-1 w-[47%]"></hr>
            </div>
            <Normal></Normal>
            <Errorpop error={handleErrorValue()} setError={handleSetError()}></Errorpop>
        </form>
    )
}

export default CardSignIn;
