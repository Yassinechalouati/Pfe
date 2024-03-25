
import { IoMdCalendar } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";

function Schedule(props) {
    const modalRef = useRef(null)
    const timeRef= useRef(null)

    const times = [];

    //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
    const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setVisibility(false)
    }
    };
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    // Generate times from 12:00 AM to 11:45 PM in 15-minute intervals
    if(formattedDate  !== props.selectedDate ) {
            for (let hour = 0; hour < 24; hour++) {
                for (let minute = 0; minute < 60; minute += 15) {
                    const hour12 = hour % 12 || 12;
                    const hourStr = hour12.toString().padStart(2, '0');
                    const minuteStr = minute.toString().padStart(2, '0');
                    const amPm = hour < 12 ? 'AM' : 'PM';
                    times.push(`${hourStr}:${minuteStr} ${amPm}`);
                }
            }
        }
        else {
            for (let hour = currentHour; hour < 24; hour++) {
                const startMinute = (hour === currentHour) ? Math.ceil(currentMinute / 15) * 15 : 0;
                for (let minute = startMinute; minute < 60; minute += 15) {
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

    
    const handleTime = () => {
        if (timeRef.current) {
            timeRef.current.click(); // Focus on the select element
        }
    };

    return (<>
            {
                props.visibility?
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
                    <div ref={modalRef} className=" bg-white flex flex-col justify-center space-y-5 shadow-lg rounded-lg px-8 py-6 z-30">
                        <span className="block text-center text-black text-lg mb-4">Schedule a Lesson</span>
                        <div className="flex items-center space-x-6 mb-4"> 
                            <IoMdCalendar size="25" className="text-darkg"></IoMdCalendar>
                            <span className="text-darkg">{props.selectedDate}</span>
                        </div>
                        <div className="flex cursor-pointer hover:bg-lightg py-2 items-center space-x-6 mb-4" onClick={handleTime}>
                            <IoMdTime size="25" className="text-darkg" />
                            <span className="text-darkg">Select Time</span>
                            <select ref={timeRef} className="border z-50 border-gray-300 px-2 py-1 rounded-md">
                                {times.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center space-x-6 mb-4"> 
                            <IoIosTimer size="25" className="text-darkg"></IoIosTimer>
                            <span className="text-darkg">Lesson Length</span>
                        </div>
                        <div className="flex items-center space-x-6 mb-4"> 
                            <FaChalkboardTeacher size="25" className="text-darkg"></FaChalkboardTeacher>
                            <span className="text-darkg">Select Tutor</span>
                        </div>
                        <div className="flex justify-end"> 
                            <button className="px-4 py-2 bg-button text-white rounded-lg ">Continue</button>
                        </div>
                    </div>
                </div>
                :
                null
            }
    </>
    );
}

export default Schedule;