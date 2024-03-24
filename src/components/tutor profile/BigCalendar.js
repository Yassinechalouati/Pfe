import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";



function BigCalendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [slideDirection, setSlideDirection] = useState(null);
    const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });

    const calendarGridRef = useRef(null);

    //handling the animation when sliding 
    useEffect(() => {
        if (slideDirection) {
            // Add animation class based on the slide direction
            calendarGridRef.current.classList.add(`slide-${slideDirection}`);
            // Remove animation class after animation ends
            const handleAnimationEnd = () => {
                calendarGridRef.current.classList.remove(`slide-${slideDirection}`);
                setSlideDirection(null);
            };
            calendarGridRef.current.addEventListener('animationend', handleAnimationEnd);
            // Clean up event listener
            return () => {
                calendarGridRef.current.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [slideDirection]);


    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    //getting the number of days in a specific month
    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    //control the next button
    const prevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11); // December
        } else {
            setMonth(month - 1);
        }
        setSlideDirection("right");
    };

    //contorl the next button
    const nextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0); // January
        } else {
            setMonth(month + 1);
        }
        setSlideDirection("left");
    };

    //button to get back to actual date
    const actualDay =() => {
        setYear(new Date().getFullYear())
        setMonth(new Date().getMonth())
    }

    const handleHover = (event) => {
        const rect = event.target.getBoundingClientRect();
        const positionX = rect.left + window.scrollX;
        const positionY = rect.bottom + window.scrollY;
        setOptionsPosition({ x: positionX, y: positionY });
    };
    


    const generateCalendarGrid = () => {
        const today = new Date();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); //index of the first day of the month
        const totalDays = daysInMonth(year, month);
        const grid = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(<div key={`empty-${i}`} className="calendar-cell empty-cell"></div>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= totalDays; day++) {
            const currentDate = new Date(year, month, day);
            let cellClass = "py-1 px-3 relative lg:p-4 rounded-lg min-h-32 text-sm w-full text-left ";
            if (currentDate.getDate() === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear()) {
                cellClass += " bg-cellColor relative overflow-visible hover:bg-darkg transition-colors group text-white cursor-pointer";
                grid.push(
                    <div key={day} className={cellClass} onMouseEnter={handleHover}>
                        <div className={`absolute ${optionsPosition.x > window.innerWidth / 2 ? 'right-0' : 'left-0'} ${optionsPosition.y > window.innerHeight / 2 ? 'bottom-0' : 'top-0'} ${optionsPosition.x > window.innerWidth / 2 ? 'origin-top-right' : 'origin-bottom-left'} hidden group-hover:flex z-10 bg-white px-8 py-5 shadow rounded-lg flex-col space-y-6`}>
                            <span className="text-center text-darkg text-lg">Schedule a Lesson</span>
                            <div className="flex items-center space-x-7"> 
                                <IoMdCalendar size="25" className="text-darkg"></IoMdCalendar>
                                <span className="text-darkg">Monday March 25, 2024</span>
                            </div>
                            <div className="flex items-center space-x-7"> 
                                <IoMdTime size="25" className="text-darkg"></IoMdTime>
                                <span className="text-darkg">Select Time</span>
                                <input type ="time" className=""></input>
                            </div>
                            <div className="flex items-center space-x-7"> 
                                <IoIosTimer size="25" className="text-darkg"></IoIosTimer>
                                <span className="text-darkg">Lesson Length</span>
                            </div>
                            <div className="flex items-center space-x-7"> 
                                <FaChalkboardTeacher size="25" className="text-darkg"></FaChalkboardTeacher>
                                <span className="text-darkg">Select Tutor</span>
                            </div>
                            <div className="flex items-center justify-end"> 
                                <button className="px-2 py-4 bg-button text-white rounded-lg ">Continue</button>
                            </div>
                        </div>
                        <MdAddBox size="25" className="absolute group-hover:flex hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        <span className=" rounded-full bg-button text-white p-1">
                            {day}
                        </span>
                    </div>
                );
            } else if (currentDate < today) {
                cellClass += " bg-lightg text-darkg ";
                grid.push(
                    <div key={day} className={cellClass}>
                        {day}
                    </div>
                );
            } else {
                cellClass += " bg-cellColor relative hover:bg-darkg transition-colors group text-white cursor-pointer";
                grid.push(
                    <div key={day} className={cellClass}>
                        <div className={`absolute ${optionsPosition.x > window.innerWidth / 2 ? 'right-0' : 'left-0'} ${optionsPosition.y > window.innerHeight / 2 ? 'bottom-0' : 'top-0'} ${optionsPosition.x > window.innerWidth / 2 ? 'origin-top-right' : 'origin-bottom-left'} hidden group-hover:flex z-10 bg-white px-8 py-5 shadow rounded-lg flex-col space-y-6`}>
                            <span className="text-center text-darkg text-lg">Schedule a Lesson</span>
                            <div className="flex items-center space-x-7"> 
                                <IoMdCalendar size="25" className="text-darkg"></IoMdCalendar>
                                <span className="text-darkg">Monday March 25, 2024</span>
                            </div>
                            <div className="flex items-center space-x-7"> 
                                <IoMdTime size="25" className="text-darkg"></IoMdTime>
                                <span className="text-darkg">Select Time</span>
                                <input type ="time" className=""></input>
                            </div>
                            <div className="flex items-center space-x-7"> 
                                <IoIosTimer size="25" className="text-darkg"></IoIosTimer>
                                <span className="text-darkg">Lesson Length</span>
                            </div>
                            <div className="flex items-center space-x-7"> 
                                <FaChalkboardTeacher size="25" className="text-darkg"></FaChalkboardTeacher>
                                <span className="text-darkg">Select Tutor</span>
                            </div>
                            <div className="flex items-center justify-end"> 
                                <button className="px-2 py-4 bg-button text-white rounded-lg ">Continue</button>
                            </div>
                        </div>
                        <MdAddBox size="25" className="absolute group-hover:flex hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        {day}
                    </div>
                );
            }
        }

        return grid;
    };

    return (
        <div className={`bg-backg overflow-y-auto  overflow-x-hidden py-4 px-4 lg:px-36 rounded-lg h-full shadow-lg`}>
            <div className="calendar-header relative w-full flex items-center lg:justify-center mb-4">
                <div className="flex items-center space-x-7 lg:space-x-36">
                    <IoIosArrowDropleftCircle size="25" className="text-button hover:text-orange-600 cursor-pointer" onClick={prevMonth}></IoIosArrowDropleftCircle>
                    <span className="text-2xl font-bold">{`${months[month]} ${year}`}</span>
                    <IoIosArrowDroprightCircle size="25" className="text-button hover:text-orange-600 cursor-pointer" onClick={nextMonth}></IoIosArrowDroprightCircle>
                </div>
                <button onClick={actualDay} className="absolute right-4 cursor-pointer px-4 py-2 bg-lightbutton hover:bg-orange-600 hover:text-white hover:border-none border rounded-lg text-button border-button">Today</button>
            </div>
            <div ref={calendarGridRef} className={`calendar-grid grid grid-cols-7 gap-2`}>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Sun</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Mon</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Tue</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Wed</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Thu</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Fri</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Sat</div>
                {generateCalendarGrid()}
            </div>
        </div>
    );
}

export default BigCalendar;
