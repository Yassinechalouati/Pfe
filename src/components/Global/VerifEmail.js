import { MdMarkEmailRead } from "react-icons/md";
import { useDispatch } from "react-redux";
import {  setVerificationTutor } from "../../state/slices/tutorSlice"
import {  setVerificationLearner } from "../../state/slices/userSlice"

function VerifEmail({role}) {

    const dispatch = useDispatch()
    
    const handleBack =() => {
        console.log(role);
        if(role ==="learner") {
            dispatch(setVerificationLearner(false))
        }else if (role === "tutor") {
            dispatch(setVerificationTutor(false))
        }
    }

    const handleResend = () => {

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
                <button type="button" onClick={handleBack} className={`bg-lightbutton border border-elements flex justify-center items-center w-[20%] sm:w-[15%] md:w-[15%] lg:w-[15%] xl:w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-elements hover:shadow`}>
                    <span className="text-sm ">Go back</span>
                </button>
                <button type="button" onClick={handleResend} className={`bg-elements flex justify-center items-center w-[20%] sm:w-[15%] md:w-[15%] lg:w-[15%] xl:w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white hover:shadow`}>
                    <span className="text-sm ">Resend</span>
                </button>
            </div>
        </div>
    );
}

export default VerifEmail;