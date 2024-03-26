
import { IoMdCalendar } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";



function Schedule(props) {
    const modalRef = useRef(null)

    const [index, setIndex] = useState(0)

    const times = [];

    //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
    const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setVisibility(false)
    }
    };
    

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    // Check if the selected date is today
    if (formattedDate === props.selectedDate) {
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const startHour = currentHour + 2; // Start showing times from 2 hours ahead of the current time
        const startMinute = currentMinute < 45 ? 0 : 15; // Start from the next quarter hour

        for (let hour = startHour; hour < 24; hour++) {
            const minuteStart = (hour === startHour) ? startMinute : 0;
            for (let minute = minuteStart; minute < 60; minute += 60) {
                const hour12 = hour % 12 || 12;
                const hourStr = hour12.toString().padStart(2, '0');
                const minuteStr = minute.toString().padStart(2, '0');
                const amPm = hour < 12 ? 'AM' : 'PM';
                times.push(`${hourStr}:${minuteStr} ${amPm}`);
            }
        }
    } else {
        // Generate times from 12:00 AM to 11:45 PM in 15-minute intervals
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 60) {
                const hour12 = hour % 12 || 12;
                const hourStr = hour12.toString().padStart(2, '0');
                const minuteStr = minute.toString().padStart(2, '0');
                const amPm = hour < 12 ? 'AM' : 'PM';
                times.push(`${hourStr}:${minuteStr} ${amPm}`);
            }
        }
    }


    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    const handleNavigateBack = () => {
        setIndex(prevValue => prevValue>0 ? prevValue-1 : prevValue)
    }
    
    const handleNavigateForward = () => {
        setIndex(prevValue => prevValue<2 ? prevValue+1 : prevValue)
    }


    const content = [
        <>
        <span className="block text-center text-black font-semibold text-lg">Schedule a Lesson</span>
        <div className="flex p-2 items-center space-x-6"> 
            <IoMdCalendar size="25" className="text-black"></IoMdCalendar>
            <span className="text-darkg">{props.selectedDate}</span>
        </div>
        <div className="flex p-2 items-center space-x-6">
            <IoMdTime size="25" className="text-black" />
            <span className="text-darkg">Select Time</span>
            <select className="border border-elements z-50 px-4 py-1 rounded-md">
                {times.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>
        </div>
        <div className="flex p-2 items-center space-x-6"> 
            <IoIosTimer size="25" className="text-black"></IoIosTimer>
            <span className="text-darkg">Lesson Length</span>
            <span className="text-elements">50 minutes</span>
        </div>
        <div onClick={handleNavigateForward} className="flex p-2 cursor-pointer hover:bg-lightg rounded-md items-center  space-x-6"> 
            <FaChalkboardTeacher size="25" className="text-black"></FaChalkboardTeacher>
            <span className="text-darkg">Select Tutor</span>
            <div className="flex-grow"></div>
            <MdNavigateNext size="25" className="text-elements"></MdNavigateNext>
        </div>
        </>,
        <>
        <div className="relative flex justify-center items-center w-full">
            <MdNavigateBefore onClick={handleNavigateBack} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
            <span className="block text-center text-black font-semibold text-lg">Select Tutor</span>
        </div>
        <div className="flex justify-center p-2 items-center space-x-6"> 
            <IoMdCalendar size="25" className="text-black"></IoMdCalendar>
            <span className="text-darkg">{props.selectedDate}</span>
        </div>
        <input placeholder="Search..." type="search" className="w-full p-3"></input>
        <div className="overflow-y-auto py-4 pr-5 w-full flex flex-col space-y-4">
            <div onClick={handleNavigateForward} className="flex cursor-pointer hover:bg-lightg rounded-md p-2 w-full items-center space-x-2">
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
        </>,
        <>
        <div className="relative flex justify-center items-center w-full">
            <MdNavigateBefore onClick={handleNavigateBack} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
            <span className="block text-center text-black font-semibold text-lg">Schedule</span>
        </div>
        <div className="flex p-2 items-center justify-center space-x-6"> 
            <IoMdCalendar size="25" className="text-black"></IoMdCalendar>
            <span className="text-darkg">{props.selectedDate}</span>
        </div>
        <span className="text-darkg">Choose lesson topic</span>
        <select className="border border-elements z-50 px-4 py-1 rounded-md">
            <option>Exam Preparation</option>
            <option>Asking for advice</option>
            <option>Medical Learning</option>
            <option>Entrepreneurship</option>
        </select>
        <span className="text-darkg">Choose lesson difficulty</span>
        <select className="border border-elements z-50 px-4 py-1 rounded-md">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
        </select>
        <div className="flex justify-center"> 
            <button className="px-4 py-2 bg-button text-white rounded-lg ">Book lesson</button>
        </div>
        </>
    ]

    return (<>
            {
                props.visibility?
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
                    <div ref={modalRef} className="max-h-[70%] bg-backg flex flex-col justify-center max-w-[90%] lg:max-w-[40%] space-y-5 shadow-lg rounded-lg p-6 z-30">
                        
                        {
                            content[index]
                        }
                    </div>
                </div>
                :
                null
            }
    </>
    );
}

export default Schedule;