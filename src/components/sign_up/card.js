import Progress from './progress_bar'
import First from './first_step'
import {useState} from 'react'
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import Second from './second_step'
import Third from './third_step'

export default function Card() {
    //step index
    const [step, setStep] = useState(0)

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
    console.log(step)
    return(
        <form className="bg-white px-10 py-4 w-[60%] justify-around rounded-3xl h-[93%] flex flex-col items-center">
            <Progress></Progress>
            <hr className="h-1 w-full"></hr>
            {
                content[step]
            }
            <div className="flex justify-between w-full">
                <button type="submit" onClick={handlePrevious} className="bg-button space-x-2 flex justify-center items-center w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white cursor-pointer hover:shadow ">
                        <GrFormPreviousLink  size="25"></GrFormPreviousLink>
                        <span className="text-md">Back</span>
                </button>
                <button type="submit" onClick={handleNext} className="bg-button space-x-2 flex justify-center items-center w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white cursor-pointer hover:shadow ">
                        <span className="text-md">Next</span>
                        <GrFormNextLink size="25"></GrFormNextLink>
                </button>
                
            </div>
        </form>
    );
}