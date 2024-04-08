
import { IoMdTime } from "react-icons/io"
import { IoIosTimer } from "react-icons/io"
import { FaChalkboardTeacher } from "react-icons/fa"
import { MdNavigateNext } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { setLanguage, setLessonLength, setTime } from "../../../state/slices/Schedule"
import {useDispatch, useSelector} from 'react-redux'
import { MdLanguage } from "react-icons/md";



function FirstStep(props) {
    
    const duration = [
        '15 minutes',
        '30 minutes', 
        '45 minutes',
        '60 minutes'
    ]

    const languages = [
        "English", 
        "French",
        "Arabic"
    ]
    
    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()

    //handling the given time output from the user
    const handleTimeChange = (e) => {
        //if the user already chose length and he picks dates where there are limitations in lengths, he gets the maximum length he can
        // example: length picked 60 minutes, user picks 11:30 PM he gets 30 minutes
        if(e.target.value === "11:45 PM" && scheduleData.lessonLength){
            dispatch(setLessonLength(duration[0]))
        }else if(e.target.value ==="11:30 PM" && scheduleData.lessonLength !== duration[0] && scheduleData.lessonLength !== duration[1]) {
            dispatch(setLessonLength(duration[1]))
        }else if(e.target.value === "11:15 PM" && scheduleData.lessonLength !== duration[0] && scheduleData.lessonLength !== duration[1] && scheduleData.lessonLength !== duration[2] ) {
            dispatch(setLessonLength(duration[2]))
        }
        dispatch(setTime(e.target.value))

    }

    const handleLessonLengthChange = (e) => {
        dispatch(setLessonLength(e.target.value))
    }
    
    const handleLanguageChange = (e) => {
        dispatch(setLanguage(e.target.value))
    }

    //we show possbile duration based on picked time
    //we're assuring that the max end_time is 00 in the next day
    function renderOptions() {
        if (scheduleData.time === "11:45 PM") {
          return duration.slice(0, 1).map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ));
        } else if (scheduleData.time === "11:30 PM") {
          return duration.slice(0, 2).map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ));
        } else if (scheduleData.time === "11:15 PM") {
          return duration.slice(0, 3).map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ));
        } else {
          return duration.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ));
        }
      }

    return (
        <>
            <span className="block text-center text-black font-semibold text-lg">Schedule a Lesson</span>
            <div className="flex p-2 items-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <IoMdTime size="25" className={`${scheduleData.time? 'text-button': 'text-active'}`} />
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
                <IoIosTimer size="25" className={`${scheduleData.lessonLength? 'text-button': 'text-active'}`}></IoIosTimer>
                <span className="text-active">Select Lesson Length</span>
                <select onChange={handleLessonLengthChange} value={scheduleData.lessonLength} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select duration</option>
                    {
                        renderOptions()
                    }
                </select>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <MdLanguage size="25" className={`${scheduleData.language? 'text-button': 'text-active'}`} />
                <span className="text-active">Select Language</span>
                <div className="flex-grow"></div>
                <select onChange={handleLanguageChange} value={scheduleData.language} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select Language</option>
                    {languages.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div onClick={props.moveForward} className={`flex p-2 ${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'hover:bg-lightg cursor-pointer': ''} rounded-md items-center  space-x-6`}> 
                <FaChalkboardTeacher size="25" className={`${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'text-active' : 'text-disabled'} `}></FaChalkboardTeacher>
                <span className={`${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'text-active' : 'text-disabled'}`}>Select preferences</span>
                <div className="flex-grow"></div>
                <MdNavigateNext size="25" className={`${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'text-elements' : 'text-disabled'}`}></MdNavigateNext>
            </div>
            </>
    );
}

export default FirstStep;