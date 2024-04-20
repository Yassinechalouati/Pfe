import Settings from "../../components/Global/Settings";
import TutorNavBar from "../../components/tutor profile/NavBar";
import LinguaBuddy from "../learner/Profile/LinguaBuddy";
import axiosInstance from '../../interceptors/axiosInterceptor'
import { useEffect, useRef } from "react";
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
    setDisplayableVideo, 
    setEducation, 
    setEmail, 
    setHasPassword,
    setTeachingStyle, 
    setTel,
    setLanguages,
    setIsLoading, 
    setWorkExperience,
    setCountryFlag,
    setId

} from '../../state/slices/tutorSlice'
import { fetchFile } from "../../components/Global/functions";
import { addNotification, incrementNumberOfNotificaitions } from "../../state/slices/NotificationSlice"
import io from 'socket.io-client';


function TutorProfile() {

    const socket = io('http://localhost:5000', {
    auth: {
        token: localStorage.getItem('accesstoken')
    }
    });

    const dispatch = useDispatch()

    const tutorData = useSelector(state => state.tutorData)

    const pendingNotificationNumber = useSelector(state => state.notificationsData.pendingNotificationNumber)

    
    useEffect(() => {
        

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
                    dispatch(setId(response.data.message.id)),
                    dispatch(setFirstName(response.data.message.firstname)),
                    dispatch(setLastName(response.data.message.lastname)),
                    dispatch(setEmail(response.data.message.email)),
                    dispatch(setHasPassword(response.data.message.hasPassword)),
                    dispatch(setDisplayableVideo(response.data.message.introductionVideo)),
                    dispatch(setAboutMe(response.data.message.AboutMe)),
                    dispatch(setDescription(response.data.message.description)),
                    dispatch(setTeachingStyle(response.data.message.teachingStyle)),
                    dispatch(setEducation(JSON.parse(response.data.message.Education))),
                    dispatch(setLanguages(JSON.parse(response.data.message.Languages))),
                    dispatch(setWorkExperience(JSON.parse(response.data.message.WorkExperience))),
                    dispatch(setCountry(response.data.message.country)),
                    dispatch(setTel(response.data.message.tel)),
                    dispatch(setBirthday(response.data.message.Birthday)),
                ])
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
    }, []);

    const handleNotification = (data_) => {
        //if there are already notifications we add it
        console.log("adding notification");
        dispatch(addNotification(data_.notification))
        console.log("incrementing number of notifications");


        console.log("number of notifications: ", pendingNotificationNumber+1);
        //if there isn't we just update that there's a new notification
        dispatch(incrementNumberOfNotificaitions())
    }
    

    useEffect(() => {
        if(tutorData.id && socket) {
            console.log("condition true", socket);

            socket.emit('createRoom', tutorData.id)
            // Listener for incoming notifications
            
            socket.on('Notification incoming', handleNotification)
        }

         // Clean up function to remove event listener when component unmounts
         return () => {
            socket.off('Notification incoming', handleNotification);
        };

    }, [tutorData.id])


    const bodyContent = {
        Courses: <Courses></Courses>,
        Profile: <Feed></Feed>,
        Classrooms: <Classrooms></Classrooms>,
        ChatBot: <LinguaBuddy></LinguaBuddy>,
        Settings: <Settings></Settings>,
        Exams: <Exams></Exams>,
    }
    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;



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
        }
    }

    return (
        <div className="w-screen h-screen bg-backg flex flex-col">
            <TutorNavBar></TutorNavBar>
            {
                handleTutorBody()
            }
        </div>
    );
}

export default TutorProfile;