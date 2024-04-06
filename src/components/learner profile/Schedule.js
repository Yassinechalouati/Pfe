
import { useRef, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {resetData, setSteps, setVisibility} from '../../state/slices/Schedule'
import FirstStep from "./CalendarSchedule/FirstStep"
import SecondStep from "./CalendarSchedule/SecondStep"
import ThirdStep from "./CalendarSchedule/ThridStep"
import { setTutorSearchList } from "../../state/slices/userSlice"


function Schedule(props) {
    const modalRef = useRef(null)
    const scheduleData = useSelector(state => state.scheduleData) 

    const dispatch = useDispatch()


    const times = [];

    //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            //upon canceling we reset the data 
            dispatch(resetData()) 
            dispatch(setTutorSearchList([]))
            dispatch(setVisibility(false))
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
            for (let minute = minuteStart; minute < 60; minute += 15) {
                const hour12 = hour % 12 || 12;
                const hourStr = hour12.toString().padStart(2, '0');
                const minuteStr = minute.toString().padStart(2, '0');
                const amPm = hour < 12 ? 'AM' : 'PM';
                times.push(`${hourStr}:${minuteStr} ${amPm}`);
            }
        }
    } else {
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


    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    
    //handling the next button
    const handleNavigateBack = () => {
        if(scheduleData.step > 0) {
            dispatch(setSteps(scheduleData.step-1))
        }
    }

    
    //handling the back button
    const handleNavigateForward = () => {
        if(scheduleData.step < 2) {
            if(scheduleData.step === 0 && scheduleData.time && scheduleData.lessonLength && scheduleData.language){
                dispatch(setSteps(scheduleData.step+1))
            }
            else if( scheduleData.step === 1 && scheduleData.lessonTopic && scheduleData.lessonDifficulty){
                dispatch(setSteps(scheduleData.step+1))
            }
        }
    }
  
    //steps to fill schedule a lesson
    const content = [
        <FirstStep selectedDate={props.selectedDate} times={times} moveForward={handleNavigateForward} moveBackwards={handleNavigateBack}></FirstStep>,
        <SecondStep  selectedDate={props.selectedDate} moveForward= {handleNavigateForward} moveBackwards={handleNavigateBack} ></SecondStep>,
        <ThirdStep selectedDate={props.selectedDate} moveBackwards={handleNavigateBack}></ThirdStep>
    ]

    return (<>
            {
                scheduleData.visibility?
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
                    <div ref={modalRef} className="max-h-[70%] bg-backg flex flex-col justify-center max-w-[90%] lg:max-w-[40%] space-y-5 shadow-lg rounded-lg p-6 z-30">
                        {
                            content[scheduleData.step]
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

