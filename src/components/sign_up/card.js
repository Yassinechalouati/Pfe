import Progress from './progress_bar'
import First from './first_step'
import { GrFormNextLink } from "react-icons/gr"
import { GrFormPreviousLink } from "react-icons/gr"
import Second from './second_step'
import Third from './third_step'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import {setSignUpStep} from '../../state/slices/userSlice'
import Errorpop from './Error_popup'
import { setError } from '../../state/slices/errorSlice'
import axios from 'axios'


export default function Card() {
    //step index
    const step = useSelector((state) => state.userData.signupStep)

    //getting elements from redux store
    const userData = useSelector((state) => state.userData)

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    //steps
    const content = [
        <First></First>,
        <Second></Second>,
        <Third></Third>
    ]

    //handle regular Signup 
    const handleRegularSignup = async () => {
        try {
            const response = await  axios.post('http://localhost:5000/regular_signup', {
                email: userData.email, 
                pword: userData.password,
                pfp: userData.pic
            })
            localStorage.setItem('refreshtoken', response.headers['refreshtoken'])
            localStorage.setItem('accesstoken', response.headers['accesstoken'])
            console.log(localStorage);
            dispatch(setSignUpStep(step<2? step + 1: step))
        }catch(err) {
            dispatch(setError(err.response.data.message))
            console.log(err);
        }
    }

    //handle 
    

    //Next button logic moving forward through the steps
    const handleNext= (e) => {
        e.preventDefault()
        //if we're in the first step we make the signup with the field given by the user
        if(step === 0 ) {
            handleRegularSignup()
        }
        else if (step === 1) {

            dispatch(setSignUpStep(step<2? step + 1: step))
        }
    }

    //Back Button logic going backwards through the steps
    const handlePrevious =(e) => {
        e.preventDefault()
        dispatch(setSignUpStep(step>0 ?step - 1: step))
    }

    //handling the opacity of the next button if it's disabled
    const handleButtonDisabilityOpacity = () => {
        if(step === 0 ) {
            if ((userData?.email === "" || userData?.password === "" || userData?.confpass === "" || userData?.pic === "")){
                return "opacity-60"
            }
            else {
                return "cursor-pointer"
            }
        }
        else if(step === 1) {
            if(userData?.proficiency === ""){
                return "opacity-60"
            }
            else {
                return "cursor-pointer"
            }
        }
        else if(step === 2) {
            if(userData?.goals.length === 0 || userData?.topics.length === 0){
                return "opacity-60"
            }
            else{
                return "cursor-pointer"
            }
        }
    }

    //setting the button disabled if the user didn't provide the data of the form
    const handleButtonDisability = () => {
        if(step === 0) {
            if ((userData?.email === "" || userData?.password === "" || userData?.confpass === "" || userData?.pic === "")){
                return true
            }
            else {
                return false
            }
        }
        else if(step ===1){
            if(userData?.proficiency === "") {
                return true
            }
            else {
                return false
            }
        }
        else if(step === 2) {
            if(userData?.goals.length === 0 || userData?.topics.length === 0){
                return true
            }
            else {
                return false 
            }
        }
    }

    return(
        <form onSubmit={handleNext} className="bg-white px-10 py-4 w-[97%] h-[95%] sm:w-[80%] sm:h-[93%] md:w-[60%] md:h-[93%] lg:w-[60%] lg:h-[93%] xl:w-[60%] xl:h-[93%] space-y-4 rounded-3xl flex flex-col items-center">
            <Progress></Progress>
            <hr className="h-1 w-full"></hr>
            <div className={`flex flex-col w-full overflow-y-scroll scrollbar-hide h-full ${step === 0? "space-y-2": "space-y-4  "}`}>
            {
                content[step]
            }
           </div>
            <div className={`flex ${step<2? "justify-end": "justify-between"} w-full flex-grow items-center`}>
                <button type="button" onClick={handlePrevious} className={`text-button bg-lightbutton border-button  border space-x-2 ${step<2? "hidden": ""} sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 flex justify-center items-center sm:w-[15%] md:w-[15%] lg:w-[15%] xl:w-[15%] w-[20%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full cursor-pointer hover:shadow`}>
                        <GrFormPreviousLink  size="25"></GrFormPreviousLink>
                        <span className="text-base hidden sm:block md:block lg:block xl:block">Back</span>
                </button>
                <button type="submit" disabled={handleButtonDisability()} className={`bg-button ${handleButtonDisabilityOpacity()} sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 border border-button flex justify-center items-center w-[20%] sm:w-[15%] md:w-[15%] lg:w-[15%] xl:w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white hover:shadow`}>
                        <span className="text-base hidden sm:block md:block lg:block xl:block">Next</span>
                        <GrFormNextLink size="25"></GrFormNextLink>
                </button>
            </div>
            <Errorpop></Errorpop>
        </form>
    );
}