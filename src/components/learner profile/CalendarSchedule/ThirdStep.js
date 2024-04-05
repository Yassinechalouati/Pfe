
import { useSelector, useDispatch } from "react-redux"
import { resetData, setLessonDifficulty, setLessonTopic, setVisibility } from "../../../state/slices/Schedule"
import { MdNavigateBefore } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import axiosInstance from "../../../interceptors/axiosInterceptor"
import { Addlesson, appendLesson, replaceFirstLessonItem } from "../../../state/slices/lessonsList"



function ThirdStep(props) {

    const learnerId= useSelector(state => state.userData.id)

    const lessonList = useSelector(state => state.lessonsList.firstlessonList)
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
                
                const selectedDate = scheduleData.selectedDate + " "+ normalTime
                const response = await axiosInstance.post('http://localhost:5000/learner/scheduleLesson', {
                    tutorId: scheduleData.selectedTutor,
                    lessonTopic: scheduleData.lessonTopic,
                    lessonDifficulty: scheduleData.lessonDifficulty,
                    selectedDate: selectedDate,
                    lessonLength: scheduleData.lessonLength
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })


                //we're verifying if the we got a lesson on that date or not
                let test =false
                let index = -5

                for (let i = 0; i < lessonList.length; i++) {
                    const lesson = lessonList[i]
                    const lessonDate = new Date(lesson.start_time)
                    const options = { 
                        day: '2-digit', 
                        month: '2-digit',
                        year: 'numeric'
                    };

                    const formattedDate = lessonDate.toLocaleDateString('en-US', options)
                    console.log("condition: ", formattedDate === scheduleData.selectedDate);
                    console.log("formattedDate: ", formattedDate, "selectedDate: ", scheduleData.selectedDate);
                    if (formattedDate === scheduleData.selectedDate){

                        // Extract hours and minutes from the Date object
                        const hours = lessonDate.getUTCHours(); // Use getUTCHours() for UTC time
                        const minutes= lessonDate.getUTCMinutes(); // Use getUTCMinutes() for UTC time


                        //compare the hours ken eli jebneh jdid 9bal eli deja mawjoud wa9tha nekhdou el index
                        if(formattedHours < hours  ) {
                            console.log("formattedHours < hours", formattedHours, " < ", hours  );
                            index = i
                        }else if(formattedHours === hours) {
                            if(formattedMinutes < minutes) {
                                console.log("formattedHours < minutes");
                                index = i 
                            }
                        }

                        test = true
                        break
                    }
                }
                const date = scheduleData.selectedDate
                const month = date.split('/')[0]
                const day = date.split('/')[1]
                const year = date.split('/')[2]
                const [hours, minutes] = normalTime.split(':').map(Number);

                const lessonDuration = parseInt(scheduleData.lessonLength.split(' ')[0]);


                // Calculate adjusted hours and minutes
                let adjustedHours = hours + Math.floor((minutes + lessonDuration) / 60);
                let adjustedMinutes = (minutes + lessonDuration) % 60

                // Adjust date if necessary
                let endDate = new Date(Date.UTC(year, month - 1, day, adjustedHours, adjustedMinutes))

                // Format the adjusted enddate to "YYYY-MM-DD HH:MM:SS" format for MySQL
                const formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ')


                // Format the adjusted startdate to "YYYY-MM-DD HH:MM:SS" format for MySQL
                const formattedBeginDate = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+"00"

                //current Date
                const currentDate = new Date();
                const currentDateTimeString = currentDate.toISOString()
                

                const data = {
                    lesson_id: lessonList[lessonList.length-1]? lessonList[lessonList.length-1].lesson_id+1 : 0, //giving the data to be appended a new id
                    tutor_id: scheduleData.selectedTutor,
                    private_learner_id: learnerId,
                    start_time: formattedBeginDate,
                    end_time: formattedEndDate,
                    scheduling_date: currentDateTimeString,
                    lesson_topic: scheduleData.lessonTopic,
                    lesson_difficulty: scheduleData.lessonDifficulty,
                    duration: scheduleData.lessonLength,
                    Accepted: -1
                }

                //if there's no lessons in that day we show it in the calendar
                if(!test) {
                    dispatch(appendLesson(data))
                }else {
                    if(index >= 0){
                        console.log("replaceFirstLessonItem Worked");
                        dispatch(replaceFirstLessonItem({data, index}))
                    }
                }
                //adding it to the list containg all lessons
                dispatch(Addlesson(data))

                dispatch(setVisibility(false))
                dispatch(resetData())
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