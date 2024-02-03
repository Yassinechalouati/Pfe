import Progress from './progress_bar'
import First from './first_step'
import {useState} from 'react'
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import Second from './second_step'
import Third from './third_step'
import {useSelector} from 'react-redux'


export default function Card() {
    //step index
    const [step, setStep] = useState(0)
    //getting elements from redux store
    const userData = useSelector((state) => state.user_data)

    //steps
    const content = [
        <First></First>,
        <Second></Second>,
        <Third></Third>
    ]

    //Next button logic moving forward through the steps
    const handleNext= (e) => {
        e.preventDefault()
        setStep(prevValue => prevValue<2? prevValue + 1: prevValue)
    }

    //Back Button logic going backwards through the steps
    const handlePrevious =(e) => {
        e.preventDefault()
        setStep(prevValue => prevValue>0 ?prevValue - 1: prevValue)
    }

    return(
        <form className="bg-white px-10 py-4 w-[60%] space-y-4 rounded-3xl h-[93%] flex flex-col items-center">
            <Progress step={step}></Progress>
            <hr className="h-1 w-full"></hr>
            {
                content[step]
            }
            <div className={`flex ${step === 0? "justify-end": "justify-between"} w-full flex-grow items-center`}>
                <button type="submit" onClick={handlePrevious} className={`text-button bg-lightbutton border-button  border space-x-2 ${step === 0? "hidden": ""} flex justify-center items-center w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full cursor-pointer hover:shadow`}>
                        <GrFormPreviousLink  size="25"></GrFormPreviousLink>
                        <span className="text-base">Back</span>
                </button>
                <button type="submit" onClick={handleNext} className="bg-button space-x-2 border border-button flex justify-center items-center w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white cursor-pointer hover:shadow">
                        <span className="text-base">Next</span>
                        <GrFormNextLink size="25"></GrFormNextLink>
                </button>
            </div>
        </form>
    );
}