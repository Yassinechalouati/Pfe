
import { MdNavigateBefore } from "react-icons/md"
import {useDispatch, useSelector} from 'react-redux'
import { IoMdCalendar } from "react-icons/io"


function SecondStep(props) {
    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()
    
    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <MdNavigateBefore onClick={props.moveBackwards} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
                <span className="block text-center text-black font-semibold text-lg">Select Tutor</span>
            </div>
            <div className="flex justify-center p-2 items-center space-x-6"> 
                <IoMdCalendar size="25" className="text-black"></IoMdCalendar>
                <span className="text-darkg">{props.selectedDate}</span>
            </div>
            <input placeholder="Search..." type="search" className="w-full p-3"></input>
            <div className="overflow-y-auto py-4 pr-5 w-full flex flex-col space-y-4">
                <div onClick={props.moveForward} className="flex cursor-pointer hover:bg-lightg rounded-md p-2 w-full items-center space-x-2">
                    <img src="/teach.jpg" alt="tutorprofilepicture" className=" w-20 h-20 object-cover rounded-full"></img>
                    <div className="flex flex-col justify-center space-y-2">
                        <span className="text-black"> User User</span>
                        <span className="text-darkg break-all text-sm">sdsdfdsklfsdklfdsdqslkqksldsqddqsldkqsldk</span>
                    </div>
                </div>
                <div className="flex cursor-pointer hover:bg-lightg rounded-md p-2 w-full items-center space-x-2">
                    <img src="/teach.jpg" alt="tutorprofilepicture" className=" w-20 h-20 object-cover rounded-full"></img>
                    <div className="flex flex-col justify-center space-y-2">
                        <span className="text-black"> User User</span>
                        <span className="text-darkg break-all text-sm">sdsdfdsklfsdklfdsdqslkqksldsqddqsldkqsldk</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SecondStep;