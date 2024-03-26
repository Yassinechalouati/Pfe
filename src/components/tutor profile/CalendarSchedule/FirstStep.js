
import { IoMdTime } from "react-icons/io"
import { IoIosTimer } from "react-icons/io"
import { FaChalkboardTeacher } from "react-icons/fa"
import { MdNavigateNext } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { setTime } from "../../../state/slices/Schedule"
import {useDispatch, useSelector} from 'react-redux'


function FirstStep(props) {
    
    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()

    //handling the given time output from the user
    const handleTimeChange = (e) => {
        dispatch(setTime(e.target.value))
    }


    return (
        <>
            <span className="block text-center text-black font-semibold text-lg">Schedule a Lesson</span>
            <div className="flex p-2 items-center space-x-6"> 
                <IoMdCalendar size="25" className="text-black"></IoMdCalendar>
                <span className="text-darkg">{props.selectedDate}</span>
            </div>
            <div className="flex p-2 items-center space-x-6">
                <IoMdTime size="25" className="text-black" />
                <span className="text-darkg">Select Time</span>
                <select onChange={handleTimeChange} value={scheduleData.time} className="border border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select time</option>
                    {props.times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div className="flex p-2 items-center space-x-6"> 
                <IoIosTimer size="25" className="text-black"></IoIosTimer>
                <span className="text-darkg">Lesson Length</span>
                <span className="text-elements">50 minutes</span>
            </div>
            <div onClick={props.moveForward} className="flex p-2 cursor-pointer hover:bg-lightg rounded-md items-center  space-x-6"> 
                <FaChalkboardTeacher size="25" className="text-black"></FaChalkboardTeacher>
                <span className="text-darkg">Select Tutor</span>
                <div className="flex-grow"></div>
                <MdNavigateNext size="25" className="text-elements"></MdNavigateNext>
            </div>
            </>
    );
}

export default FirstStep;