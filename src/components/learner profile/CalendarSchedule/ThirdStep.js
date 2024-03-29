
import { useSelector, useDispatch } from "react-redux"
import { resetData, setLessonDifficulty, setLessonTopic, setVisibility } from "../../../state/slices/Schedule"
import { MdNavigateBefore } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import axiosInstance from "../../../interceptors/axiosInterceptor"



function ThirdStep(props) {

    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()

    const handleLessonTopicChange = (e) => {
        dispatch(setLessonTopic(e.target.value))
    }

    const handleLessonDifficultyChange = (e) => {
        dispatch(setLessonDifficulty(e.target.value))
    }

    const handleBookLesson = async () => {
        if(scheduleData.lessonTopic && scheduleData.lessonDifficulty) {
            //converting the selected time to normal one 
            // Split the time string into hours, minutes, and AM/PM
            const [time, period] = scheduleData.time.split(' ');
            const [hours, minutes] = time.split(':');

            // Convert hours to 24-hour format
            let hours24 = parseInt(hours, 10);
            if (period === 'PM' && hours24 < 12) {
                hours24 += 12;
            } else if (period === 'AM' && hours24 === 12) {
                hours24 = 0;
            }

            // Format the hours and minutes
            const formattedHours = hours24.toString().padStart(2, '0')
            const formattedMinutes = minutes.padStart(2, '0')

            // Construct the normal time string
            const normalTime = `${formattedHours}:${formattedMinutes}`


            //we contact the api here that's responsible for scheduling lessons then we reset the fields after finish the transaction
            try {
                const response = await axiosInstance.post('http://localhost:5000/learner/scheduleLesson', {
                    tutorId: scheduleData.selectedTutor,
                    lessonTopic: scheduleData.lessonTopic,
                    lessonDifficulty: scheduleData.lessonDifficulty,
                    selectedDate: scheduleData.selectedDate + " "+ normalTime,
                    lessonLength: scheduleData.lessonLength
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                console.log("visible");
                dispatch(setVisibility(false))
                dispatch(resetData())
                console.log("invisible");
            }catch(err) {
                console.log(err)
            }
        }
    }


    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <MdNavigateBefore onClick={props.moveBackwards} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
                <span className="block text-center text-black font-semibold text-lg">Schedule</span>
            </div>
            <div className="flex p-2 items-center justify-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            <span className="text-active">Choose lesson topic</span>
            <select value={scheduleData.lessonTopic} onChange={handleLessonTopicChange} className="border focus:outline-none active:outline-none border-elements z-50 px-4 py-1 rounded-md">
                <option value="" disabled>Select topic</option>
                <option value="Exam preparation">Exam Preparation</option>
                <option value="Asking for advice">Asking for advice</option>
                <option value="Medical Learning">Medical Learning</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
            </select>
            <span className="text-active">Choose lesson difficulty</span>
            <select value={scheduleData.lessonDifficulty} onChange={handleLessonDifficultyChange} className="border focus:outline-none active:outline-none border-elements z-50 px-4 py-1 rounded-md">
                <option value="" disabled>Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
            </select>
            <div className="flex justify-center"> 
                <button 
                onClick={handleBookLesson} 
                disabled={!scheduleData.lessonTopic || !scheduleData.lessonDifficulty }
                className={`px-4 py-2 bg-button text-white rounded-lg ${scheduleData.lessonTopic && scheduleData.lessonDifficulty? '' : 'opacity-60'}`}
                >
                    Book lesson</button>
            </div>
        </>
    );
}

export default ThirdStep;