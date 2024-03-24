import { MdAddBox } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useState, useRef } from "react";

const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const GenerateCalendarGrid = (props) => {
    const today = new Date();
    const firstDayOfMonth = new Date(props.year, props.month, 1).getDay();
    const totalDays = daysInMonth(props.year, props.month);
    const grid = [];

    const [showOptions, setShowOptions] = useState(false);
    const clickedCellRef = useRef(null);

    const handleCellClick = (event) => {
        setShowOptions(!showOptions);
        clickedCellRef.current = event.currentTarget; // Store reference to the clicked cell
    };

    for (let i = 0; i < firstDayOfMonth; i++) {
        grid.push(<div key={`empty-${i}`} className="calendar-cell empty-cell"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
        const currentDate = new Date(props.year, props.month, day);
        let cellClass = "py-1 px-3 relative lg:p-4 rounded-lg min-h-32 text-sm w-full text-left ";
        if (currentDate.getDate() === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()) {
                cellClass += " bg-cellColor hover:bg-darkg transition-colors group text-white cursor-pointer";
                grid.push(
                    <div key={day} className={cellClass} onClick={handleCellClick}>
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
                    <MdAddBox size="25" className="absolute group-hover:flex hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    {day}
                </div>
            );
        } else {
            cellClass += " bg-cellColor relative hover:bg-darkg transition-colors group text-white cursor-pointer";
            grid.push(
                <div key={day} className={cellClass} onClick={handleCellClick}>
                    <MdAddBox size="25" className="absolute group-hover:flex hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    {day}
                </div>
            );
        }
    }

    return (
        <>
            {grid}
            {showOptions && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 z-30">
                    <span className="block text-center text-darkg text-lg mb-4">Schedule a Lesson</span>
                    <div className="flex items-center space-x-2 mb-4"> 
                        <IoMdCalendar size="25" className="text-darkg"></IoMdCalendar>
                        <span className="text-darkg">Monday March 25, 2024</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4"> 
                        <IoMdTime size="25" className="text-darkg"></IoMdTime>
                        <span className="text-darkg">Select Time</span>
                        <input type="time" className="border z-50 border-gray-300 px-2 py-1 rounded-md" />
                    </div>
                    <div className="flex items-center space-x-2 mb-4"> 
                        <IoIosTimer size="25" className="text-darkg"></IoIosTimer>
                        <span className="text-darkg">Lesson Length</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4"> 
                        <FaChalkboardTeacher size="25" className="text-darkg"></FaChalkboardTeacher>
                        <span className="text-darkg">Select Tutor</span>
                    </div>
                    <div className="flex justify-end"> 
                        <button className="px-4 py-2 bg-button text-white rounded-lg ">Continue</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default GenerateCalendarGrid;
