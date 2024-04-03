import { useState, useRef } from "react"
import Schedule from "./Schedule"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedDate as setDate, setVisibility} from "../../state/slices/Schedule"
import { IoMdTime } from "react-icons/io"
import { setVisibility as setVisible } from "../../state/slices/ShowMore"
import ShowMore from "./CalendarSchedule/ShowMore"
import axiosInstance from "../../interceptors/axiosInterceptor"


const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
}

const GenerateCalendarGrid = (props) => {
    const today = new Date();
    const firstDayOfMonth = new Date(props.year, props.month, 1).getDay()
    const totalDays = daysInMonth(props.year, props.month)
    const grid = []
    const dispatch = useDispatch()
    const showMoreRef = useRef(null)
    const visibility = useSelector(state => state.showMoreData.visibility)
    const lessonList = useSelector(state => state.lessonsList.firstlessonList)

    const showOptions = useSelector(state => state.scheduleData.visibility)

    const [selectedDate, setSelectedDate] = useState(null)
    
    
    const saveDate = (day) => {
        //upon clicking on a cell we show the specific clicked day
        const currentDate = new Date(props.year, props.month, day)
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
    }

    //handling the logic behind show more
    const handleShowMore = async (event, day) => {
        saveDate(day)
        event.stopPropagation()
        dispatch(setVisible(true))
        // trasnforming the date into year-month-day format
        const currentDate = new Date(props.year, props.month, day)
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to zero-based month index
        const dayOfMonth = String(currentDate.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${dayOfMonth}`
        try{
            const response = await axiosInstance.post('http://localhost:5000/learner/getDayLessons', {
                date: formattedDate
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })

            console.log(response.data.result);
        }catch(err) {
            console.log("getDayLessons Error", err);
        }

    }


    const handleCellClick = (event, day) => {
            saveDate(day)
            dispatch(setVisibility(true))
    };

    const cellContent = (day, cellClass, isToday) => {
        cellClass += " bg-cellColor flex flex-col text-white cursor-pointer";
        let test = false // we're testing whether there is a scheduled lesson on that day or not 

        for (let i = 0; i < lessonList.length; i++) {
            const lesson = lessonList[i];
            const lessonDate = new Date(lesson.start_time);
            const currentDate = new Date(props.year, props.month, day);
            
            // Define the options for formatting the date
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            
            const formattedCurrentDate = currentDate.toLocaleDateString('en-US', options);
        
            // Format the date according to the options
            const formattedLessonDate = lessonDate.toLocaleDateString('en-US', options);
        
            if (formattedCurrentDate === formattedLessonDate) {
                if(formattedCurrentDate === formattedLessonDate) {
                    //formatting the start time of the lesson to Hours:minutes
                    const startDate = new Date(lesson.start_time);
                    const formattedStartTime = startDate.toLocaleTimeString('en-US', { hour12: false });
                    const [startHour, startMinute] = formattedStartTime.split(':');
    
                    const formattedStartHourMinute = `${startHour}:${startMinute}`;
    
                    //formatting the end time of the lesson to Hours:minutes
                    const endDate = new Date(lesson.end_time)
                    const formattedEndTime = endDate.toLocaleTimeString('en-US', { hour12: false });
                    const [endHour, endMinute] = formattedEndTime.split(':');
    
                    const formattedEndHourMinute = `${endHour}:${endMinute}`;
    
    
                    test = <div key={day} className={cellClass}>
                    <span className="mb-2 flex ">
                        <span className={`rounded-full min-w-7 min-h-7 text-center ${isToday? "bg-button" : "" } text-white p-1`}>
                            {day}  
                        </span>
                    </span>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="font-semibold text-center ">
                            {lesson.lesson_topic}
                        </div>
                        <div className="bg-lightGreen text-xs p-1 border border-elements text-elements rounded-xl">
                            {lesson.lesson_difficulty}
                        </div>
                        <div className="flex items-center space-x-1">
                            <IoMdTime className="text-darkg" size="15"></IoMdTime>
                            <span className="text-darkg text-xs ">
                                {formattedStartHourMinute} - {formattedEndHourMinute}
                            </span>
                        </div>
                        <button onClick={(event) => handleCellClick(event, day)} className="rounded-lg cursor-pointer w-full text-center p-1 text-xs bg-lightbutton border border-button text-button">Add</button>
                        <button ref={showMoreRef} onClick={(event) => handleShowMore(event, day)} className="cursor-pointer underline text-xs text-darkg">Show more</button>
                    </div>
                </div>
                }
                break; // Break out of the loop once condition is satisfied
            }
        }
        

        
        const result = test? test : 
                <div key={day} className={cellClass}>
                    <span className="mb-2 flex ">
                        <span className={`rounded-full min-w-7 text-center ${isToday? "bg-button" : ""} text-white p-1`}>
                            {day}  
                        </span>
                    </span>
                    <div className="flex flex-col m-auto w-full items-center justify-center space-y-2">
                        <button  onClick={(event) => handleCellClick(event, day)} className="rounded-lg cursor-pointer w-full text-center p-1 text-xs bg-lightbutton border border-button text-button">Add</button>
                    </div>
                </div>

        return result
    }


    for (let i = 0; i < firstDayOfMonth; i++) {
        grid.push(<div key={`empty-${i}`} className="calendar-cell empty-cell"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
        const currentDate = new Date(props.year, props.month, day);
        let cellClass = "py-1 px-3 min-h-52 relative lg:p-4 rounded-lg text-sm w-full text-left ";
        if (currentDate.getDate() === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()) {
                cellClass += " bg-cellColor flex flex-col justify-center text-white cursor-pointer";
                grid.push(
                    cellContent(day, cellClass, true)
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
                cellContent(day, cellClass, false)
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
