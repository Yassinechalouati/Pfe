import { MdAddBox } from "react-icons/md";
import { useState, useRef } from "react";
import Schedule from "./Schedule";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate as setDate, setVisibility } from "../../state/slices/Schedule";

const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const GenerateCalendarGrid = (props) => {
    const today = new Date();
    const firstDayOfMonth = new Date(props.year, props.month, 1).getDay();
    const totalDays = daysInMonth(props.year, props.month);
    const grid = [];
    const dispatch = useDispatch()

    const showOptions = useSelector(state => state.scheduleData.visibility)

    const [selectedDate, setSelectedDate] = useState(null);
    const clickedCellRef = useRef(null);

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
                    <div key={day} className={cellClass} onClick={(event) => handleCellClick(event, day)}>
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
                <div key={day} className={cellClass} onClick={(event) => handleCellClick(event, day)}>
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
                <Schedule selectedDate={selectedDate} />
            )}
        </>
    );
};

export default GenerateCalendarGrid;
