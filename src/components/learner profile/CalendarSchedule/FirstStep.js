
import { IoMdTime } from "react-icons/io"
import { IoIosTimer } from "react-icons/io"
import { FaChalkboardTeacher } from "react-icons/fa"
import { MdNavigateNext } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { setLessonLength, setTime } from "../../../state/slices/Schedule"
import {useDispatch, useSelector} from 'react-redux'


function FirstStep(props) {
    
    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()

    //handling the given time output from the user
    const handleTimeChange = (e) => {
        dispatch(setTime(e.target.value))

    }

    const handleLessonChange = (e) => {
        dispatch(setLessonLength(e.target.value))
    }

    const duration = [
        '15 minutes',
        '30 minutes', 
        '60 minutes'
    ]


    return (
        <>
            <span className="block text-center text-black font-semibold text-lg">Schedule a Lesson</span>
            <div className="flex p-2 items-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <IoMdTime size="25" className="text-active" />
                <span className="text-active">Select Time</span>
                <div className="flex-grow"></div>
                <select onChange={handleTimeChange} value={scheduleData.time} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select time</option>
                    {props.times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div className="flex p-2 items-center space-x-6"> 
                <IoIosTimer size="25" className="text-active"></IoIosTimer>
                <span className="text-active">Lesson Length</span>
                <select onChange={handleLessonChange} value={scheduleData.lessonLength} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select duration</option>
                    {duration.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div onClick={props.moveForward} className={`flex p-2 ${scheduleData.time && scheduleData.lessonLength? 'hover:bg-lightg cursor-pointer': ''} rounded-md items-center  space-x-6`}> 
                <FaChalkboardTeacher size="25" className={`${scheduleData.time && scheduleData.lessonLength? 'text-active' : 'text-disabled'} `}></FaChalkboardTeacher>
                <span className={`${scheduleData.time && scheduleData.lessonLength? 'text-active' : 'text-disabled'}`}>Select Tutor</span>
                <div className="flex-grow"></div>
                <MdNavigateNext size="25" className={`${scheduleData.time && scheduleData.lessonLength? 'text-elements' : 'text-disabled'}`}></MdNavigateNext>
            </div>
            </>
    );
}

export default FirstStep;