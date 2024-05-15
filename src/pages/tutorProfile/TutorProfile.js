import Settings from "../../components/Global/Settings";
import TutorNavBar from "../../components/tutor profile/NavBar";
import LinguaBuddy from "../learner/Profile/LinguaBuddy";
import axiosInstance from '../../interceptors/axiosInterceptor'
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Classrooms from "./Classrooms";
import Courses from "./Courses";
import Exams from "./Exams";
import Feed from "./Feed";
import { fetchCountryData } from "../../components/Global/functions"
import {
    setFirstName, 
    setLastName, 
    setAboutMe, 
    setBirthday, 
    setCountry, 
    setDescription, 
    setDisplayableImage, 
    setIntroductionVideo, 
    setEducation, 
    setEmail, 
    setHasPassword,
    setTeachingStyle, 
    setTel,
    setLanguages,
    setIsLoading, 
    setWorkExperience,
    setCountryFlag,
    setId,
    setUuid,
    setCreatedAt

} from '../../state/slices/tutorSlice'
import { fetchFile } from "../../components/Global/functions";
import { addNotification, setUnreadNotifications, tutorIncrementNotifications } from "../../state/slices/NotificationSlice"
import io from 'socket.io-client'
import NotificationsPage from './NotificationsPage'
import BigCalendar from "../../components/learner profile/BigCalendar";
import { addLessontoCurrentDayLessons, setCurrentDayLesson, setCurrentDayLessons, setNotificationModalVisibility } from "../../state/slices/lessonsList";
import LessonReminderModal from "../../components/Global/lessonReminderModal";

function TutorProfile() {

    const dispatch = useDispatch()

    const tutorData = useSelector(state => state.tutorData)

    const unreadNotifications = useSelector(state => state.notificationsData.unreadNotifs)

    const currentDayLessons = useSelector(state => state.lessonsList.currentDayLessons)

    const notificationModalVisibility = useSelector(state => state.lessonsList.notificationModalVisibility)

     //knowing whether it's a tutor or learner signing up
     const path = window.location.pathname;
    

    
    useEffect(() => {
        //getting tutor details
        const fetchData = async () => {
            dispatch(setIsLoading(true))
            try {
                const response = await axiosInstance.post('http://localhost:5000/tutor/details', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                    }
                })
                await Promise.all([
                    dispatch(setUuid(response.data.message.uuid)),
                    dispatch(setId(response.data.message.id)),
                    dispatch(setFirstName(response.data.message.firstname)),
                    dispatch(setLastName(response.data.message.lastname)),
                    dispatch(setEmail(response.data.message.email)),
                    dispatch(setHasPassword(response.data.message.hasPassword)),
                    dispatch(setIntroductionVideo(response.data.message.introductionVideo)),
                    dispatch(setAboutMe(response.data.message.AboutMe)),
                    dispatch(setDescription(response.data.message.description)),
                    dispatch(setTeachingStyle(response.data.message.teachingStyle)),
                    dispatch(setEducation(JSON.parse(response.data.message.Education))),
                    dispatch(setLanguages(JSON.parse(response.data.message.Languages))),
                    dispatch(setWorkExperience(JSON.parse(response.data.message.WorkExperience))),
                    dispatch(setCountry(response.data.message.country)),
                    dispatch(setTel(response.data.message.tel)),
                    dispatch(setBirthday(response.data.message.Birthday)),
                    dispatch(setCreatedAt(response.data.message.created_at))
                ])
                //fetching the image from database
                fetchFile(response.data.message.pfp, "images", "tutor", response.data.message.id)
                .then(async (resp )=> {
                    console.log(response.data.message);
                    // Dispatch actions sequentially
                    await Promise.all([
                        dispatch(setDisplayableImage(resp)),
                    ])
                    const data = await fetchCountryData(response.data.message.country)
                    dispatch(setCountryFlag(data))
                    dispatch(setIsLoading(false))
                })
                .catch(err => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
                dispatch(setIsLoading(false))
            }
        };
        
        fetchData();
    }, [])


    useEffect(() => {
        //consuming api to get if there are unread notifs or not 
        const fetchNumberOfUnreadNotifs = async () => {
            try {
                const response = await axiosInstance.post('http://localhost:5000/tutor/CountUnreadNotifications', {

                },  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                console.log("data: ", response.data.unreadNotifs);
                dispatch(setUnreadNotifications(response.data.unreadNotifs))
                
            }catch(err) {
                console.log(err)
            }
        }

        fetchNumberOfUnreadNotifs()
    }, [])

    const handleNotification = (data_) => {
        //if there are already notifications we add it
        console.log("adding notification");

        //adding notification
        dispatch(addNotification(data_.notification))

        dispatch(addLessontoCurrentDayLessons(data_.notification))

        console.log("unreadNotifications Value: ", unreadNotifications);
        //if there isn't we just update that there's a new notification

        dispatch(tutorIncrementNotifications())
    }
    

    useEffect(() => {
        if(tutorData.id) {
            const socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('accesstoken')
            }
            });
            console.log("condition true", socket);

            socket.emit('createRoom', tutorData.id)
            // Listener for incoming notifications
            
            socket.on('Notification incoming', handleNotification)
            // Clean up function to remove event listener when component unmounts
         return () => {
            socket.disconnect();
          }
        }

         
    }, [tutorData.id, localStorage])



    const bodyContent = {
        Courses: <Courses></Courses>,
        Profile: <Feed></Feed>,
        Classrooms: <Classrooms></Classrooms>,
        ChatBot: <LinguaBuddy></LinguaBuddy>,
        Settings: <Settings></Settings>,
        Exams: <Exams></Exams>,
        Notifications: <NotificationsPage></NotificationsPage>,
        Calendar: <BigCalendar></BigCalendar>
    }




    const handleTutorBody = () => {
        if (path === '/tutor/profile') {
            return bodyContent.Profile
        }else if(path === '/tutor/profile/LinguaBuddy'){
            return bodyContent.ChatBot
        }else if(path === '/tutor/profile/Exams'){
            return bodyContent.Exams
        }else if(path === '/tutor/profile/Courses') {
            return bodyContent.Courses
        }else if(path === '/tutor/profile/Classrooms') {
            return bodyContent.Classrooms
        }else if(path === '/tutor/profile/Settings') {
            return bodyContent.Settings
        }else if(path ==='/tutor/profile/Notifications'){
            return bodyContent.Notifications
        }else if(path === "/tutor/profile/Calendar"){
            return bodyContent.Calendar
        }
    }

    useEffect(() => {
        //fetching today's lessons 
        const currentDay= new Date()
        const dayOfMonth = currentDay.getDate()
        const month = currentDay.getMonth()+1
        const year = currentDay.getFullYear()

        const fetchTodaysUpcomingLessons = async () => {
            try {
                const response = await axiosInstance.post('http://localhost:5000/tutor/getDayLessons', {
                    date: `${year}-${month}-${dayOfMonth}`
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                const lessons = response.data.result
                console.log("today's lessons: ", lessons)

                dispatch(setCurrentDayLessons(lessons))
            }catch(err) {
                console.log(err)
            }
        }

        fetchTodaysUpcomingLessons()

    }, [])// Run effect only once on component mount


    useEffect(() => {
        
        //array that will hold the timeouts
        let timeoutIds = []
        if(currentDayLessons) {

            console.log("timeout effect is running!");
            //we're gonna show the lesson confirmation modal when the difference between the current time and lesson time is 15 minutes  
            currentDayLessons.forEach(lesson => {
                const startTime = new Date(lesson.start_time)
                const notificationTime = new Date(startTime.getTime() - 15 * 60000); // 15 minutes before start time
                const videoCallTime = new Date(startTime.getTime())
                // Set timeout for notification
                const timeDifference = notificationTime.getTime() - Date.now();
                const videoCallTimeDifference = videoCallTime.getTime() - Date.now()
                if (timeDifference > 0 && lesson.Accepted ===1) {
                    const timeoutId = setTimeout(() => {
                        // Display notification to the user
                        dispatch(setCurrentDayLesson(lesson))
                        dispatch(setNotificationModalVisibility(true))
                    }, timeDifference)
    
                    timeoutIds.push(timeoutId)
                }
                if(videoCallTimeDifference> 0 && lesson.Accepted ===1 ) {
                    const timeoutId = setTimeout(() => {
                        //openNewTab(lesson.uuid, lesson.firstname+ " " +lesson.lastname)
                    }, videoCallTimeDifference)
    
                    timeoutIds.push(timeoutId)
                }
            });
        }
        // Clean up any timers on unmount
        return () => {
            // Clear all pending timeouts
            timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        };
        
    }, [currentDayLessons])

    return (
        <div className="w-screen h-screen bg-backg flex flex-col">
            <TutorNavBar></TutorNavBar>
            {
                handleTutorBody()
            }
            {
                notificationModalVisibility?
                <LessonReminderModal></LessonReminderModal>
                :
                null
                /*
                <NavLink      
                target="_blank" 
                rel="noopener noreferrer"
                to={`/learner/profile/Tutor/${props.tutor.uuid}`}
                className="hidden">
                Profile</NavLink>
                */
            }
        </div> 
    );
}

export default TutorProfile;