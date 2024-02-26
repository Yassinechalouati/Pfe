import StepBar from "../../components/tutor_sign_up/StepBar"
import FirstPhase from "../../components/tutor_sign_up/FirstPhase";
import SecondPhase from "../../components/tutor_sign_up/SecondPhase";
import ThirdPhase from "../../components/tutor_sign_up/ThirdPhase";
import FourthPhase from "../../components/tutor_sign_up/FourthPhase";
import {setSteps} from '../../state/slices/tutorSlice'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../state/slices/tutorSlice"
import Errorpop from "../../components/Global/Error_popup"

function AccountPersonalization() {
    const dispatch = useDispatch()
    const tutorData = useSelector(state=> state.tutorData)

    //steps
    const content = [
        <FirstPhase></FirstPhase>, //Welcome page
        <SecondPhase></SecondPhase>, //Intro
        <ThirdPhase></ThirdPhase>, //Profile
        <FourthPhase></FourthPhase>, //Connection test
    ]
    

    const handleNextButton = (e) => {
        e.preventDefault()
        dispatch(setSteps(tutorData.steps<3? tutorData.steps+1 : tutorData.steps))
    }

    const handleBackButton = () => {
        dispatch(setSteps(tutorData.steps>0? tutorData.steps-1 : tutorData.steps))
    }

    return (
        <form className="h-screen relative w-screen flex flex-col bg-backg">
            <StepBar></StepBar>
            {
                content[tutorData.steps]
            }
            <div className="flex justify-between px-10 h-[10%] items-center w-full py-5">
                <button onClick={handleBackButton} type="button" className={`text-button bg-lightbutton border-button  border space-x-2 sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 flex justify-center items-center sm:w-[15%] md:w-[15%] lg:w-[10%] xl:w-[10%] w-[20%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full cursor-pointer hover:shadow`}>
                    <GrFormPreviousLink  size="25"></GrFormPreviousLink>
                    <span className="text-base hidden sm:block md:block lg:block xl:block">Back</span>
                </button>
                <button onClick={handleNextButton} type="submit" className={`bg-button sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 border border-button flex justify-center items-center w-[20%] sm:w-[15%] md:w-[15%] lg:w-[10%] xl:w-[10%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white hover:shadow`}>
                    <span className="text-base hidden sm:block md:block lg:block xl:block">Next</span>
                    <GrFormNextLink size="25"></GrFormNextLink>
                </button>
            </div>
            <Errorpop error={tutorData.error} setError={setError}></Errorpop>
        </form>
    );
}

export default AccountPersonalization;