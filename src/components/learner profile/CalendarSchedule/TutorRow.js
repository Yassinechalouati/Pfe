
import { useState, useEffect } from "react";
import { convertTime, fetchCountryData} from "../../Global/functions";
import { fetchFile } from "../../Global/functions";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTutor } from "../../../state/slices/Schedule";
import { Addlesson, appendLesson, replaceFirstLessonItem } from "../../../state/slices/lessonsList"
import { resetData, setVisibility } from "../../../state/slices/Schedule"
import axiosInstance from "../../../interceptors/axiosInterceptor"
import io from 'socket.io-client'
import { useRef } from "react";



function TutorRow(props) {
    const dispatch = useDispatch()
    const socket = useRef(null)
    

    

    
    const learnerId= useSelector(state => state.userData.id)

    const lessonList = useSelector(state => state.lessonsList.firstlessonList)

    const scheduleData = useSelector(state => state.scheduleData)

    //tutor profile picture
    const [imageData, setImageData] = useState()

    //flag image of the tutor's country
    const [countryData, setCountryData] = useState(null);

    //fetching tutor profile picture from backend
    async function fetchData () {
        if(props.tutor.pfp && props.tutor.id){
            fetchFile(props.tutor.pfp, "images", "Tutor", props.tutor.id)
            .then(response => {
                setImageData(response)
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    
      const fetchFlag = async () => {
        const data = await fetchCountryData(props.tutor.Country);
        setCountryData(data);
      };

    useEffect(() => {
        //getting tutor picture
        fetchData()
        //getting the flag of the tutor's country
        fetchFlag()
    }, [])


    
    const handleBookLesson = async () => {
            dispatch(setSelectedTutor(props.tutor.id))

            const {formattedHours, formattedMinutes} = convertTime(scheduleData.time)
            
            // Construct the normal time string
            const normalTime = `${formattedHours}:${formattedMinutes}`

           
        

            //we contact the api here that's responsible for scheduling lessons then we reset the fields after finish the transaction
            try {
                const selectedDate = scheduleData.selectedDate + " "+ normalTime
                const sentData =  {
                    tutorId: props.tutor.id,
                    lessonTopic: scheduleData.lessonTopic,
                    lessonDifficulty: scheduleData.lessonDifficulty,
                    selectedDate: selectedDate,
                    lessonLength: scheduleData.lessonLength,
                    lessonLanguage: scheduleData.language
                }
                const response = await axiosInstance.post('http://localhost:5000/learner/scheduleLesson', sentData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                socket.current = io('http://localhost:5000', {
                    auth: {
                    token: localStorage.getItem('accesstoken')
                    }
                })
                socket.current.emit('createRoom', (learnerId))
                socket.current.emit('notification', sentData)

                console.log("socket: ", socket.current);
 
                

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
                    if (formattedDate === scheduleData.selectedDate){

                        console.log("lessonDate:", lessonDate)
                        const hours = lessonDate.getHours().toString().padStart(2, '0')
                        const minutes = lessonDate.getMinutes().toString().padStart(2, '0')
                        console.log(hours);
                        console.log("minutes", minutes);
                        console.log("hours eli hatinehom: ", formattedHours, " hours taa existing lesson: ", hours);
                        console.log("hours condition", formattedHours  === hours);
                        console.log("minutes condition: ", formattedMinutes < minutes);

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
                    tutor_id: props.tutor.id,
                    private_learner_id: learnerId,
                    start_time: formattedBeginDate,
                    end_time: formattedEndDate,
                    scheduling_date: currentDateTimeString,
                    lesson_topic: scheduleData.lessonTopic,
                    lesson_difficulty: scheduleData.lessonDifficulty,
                    duration: scheduleData.lessonLength,
                    language: scheduleData.language,
                    Accepted: -1
                }

                console.log("data: ", data);

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

    return (
        <div onClick={handleBookLesson} className="flex cursor-pointer hover:bg-lightg rounded-md p-2 w-full items-center space-x-2">
            <img src={imageData} alt="tutorprofilepicture" className=" min-w-20 h-20 object-cover rounded-full"></img>
            <div className="flex truncate flex-col justify-center">
                <span className="text-black">{props.tutor.firstname && props.tutor.lastname ? props.tutor.firstname + " " + props.tutor.lastname : props.tutor.email}</span>
                <div className="flex space-x-2 items-center">
                    {countryData && countryData[0]?.flags && (
                        <img className="rounded-lg w-4 h-4 object-cover" src={countryData[0].flags.png} alt={props.tutor.Country} />
                    )}
                    <span className=" ml-4 text-sm text-darkg">{props.tutor.Country}</span>
                </div>
                <span className="text-darkg mt-2 text-sm">{props.tutor.description}</span>
            </div>
        </div>
    );
}

export default TutorRow;