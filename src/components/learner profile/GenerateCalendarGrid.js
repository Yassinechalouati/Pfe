import { useState, useRef } from "react";
import Schedule from "./Schedule";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate as setDate, setVisibility } from "../../state/slices/Schedule";
import { IoMdTime } from "react-icons/io"
import { setVisibility as setVisible } from "../../state/slices/ShowMore";
import ShowMore from "./CalendarSchedule/ShowMore";


const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const GenerateCalendarGrid = (props) => {
    const today = new Date();
    const firstDayOfMonth = new Date(props.year, props.month, 1).getDay();
    const totalDays = daysInMonth(props.year, props.month);
    const grid = [];
    const dispatch = useDispatch()
    const showMoreRef = useRef(null)
    const visibility = useSelector(state => state.showMoreData.visibility)

    const showOptions = useSelector(state => state.scheduleData.visibility)

    const [selectedDate, setSelectedDate] = useState(null);

    const handleShowMore = (event) => {
        event.stopPropagation();
        dispatch(setVisible(true))
    }

    const handleCellClick = (event, day) => {
            //upon clicking on a cell we show the specific clicked day
            const currentDate = new Date(props.year, props.month, day);
    
    
            const timeStamp = currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              });
    
            //this is responsible for saving the day that's been clicked in the redux reducer 
            dispatch(setDate(timeStamp))
    
            const formattedDate = currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            });
            setSelectedDate(formattedDate)
            dispatch(setVisibility(true))
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
                cellClass += " bg-cellColor text-white cursor-pointer";
                grid.push(
                    <div key={day} className={cellClass}>
                        <span className="rounded-full bg-button text-white p-1">
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
            cellClass += " bg-cellColor hover:shadow-lg relative text-white";
            grid.push(
                <div key={day} className={cellClass}>
                    <div className="flex mb-2 justify-between items-center">
                        <span className="text-white">{day}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        {
                            //<img src="/teach.jpg" className="object-cover rounded-full h-14 w-14"></img>
                        }
                        <div className="font-semibold text-center ">
                            English Lesson
                        </div>
                        <div className="bg-lightGreen text-xs p-1 border border-elements text-elements rounded-xl">
                            Advanced
                        </div>
                        <div className="flex items-center space-x-1">
                            <IoMdTime className="text-darkg" size="15"></IoMdTime>
                            <span className="text-darkg text-xs ">
                                2:20 - 3:20
                            </span>
                        </div>
                        <button  onClick={(event) => handleCellClick(event, day)} className="rounded-lg cursor-pointer w-full text-center p-1 text-xs bg-lightbutton border border-button text-button">Add</button>
                        <button ref={showMoreRef} onClick={handleShowMore} className="cursor-pointer underline text-xs text-darkg">Show more</button>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            {grid}
            {showOptions && (
                <Schedule selectedDate={selectedDate} />
            )}
            {
                visibility && (
                    <ShowMore selectedDate={selectedDate}></ShowMore>
                )
            }
        </>
    );
};

export default GenerateCalendarGrid;
