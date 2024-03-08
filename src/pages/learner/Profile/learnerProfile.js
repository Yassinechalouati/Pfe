import NavBar from "../../../components/learner profile/NavBar";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { useEffect } from "react";
import { setIsLoading, setBirthday, setComfortLevel, setCountry, setEmail, setFirstName, setFocusThemes, setGoals, setHasPassword, setLastName, setLife_Goals, setPic, setTel, setTopics } from "../../../state/slices/userSlice";
import { useDispatch } from "react-redux";
import CoursesSearch from "./CoursesSearch";
import TutorsSearch from "./TutorsSearch";
import ClassroomsSearch from './ClassroomsSearch'
import Body from '../../../components/learner profile/Body'
import LinguaBuddy from "./LinguaBuddy";


function LearnerProfile() {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setIsLoading(true))
            try {
                const response = await axiosInstance.post('http://localhost:5000/learner/details', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                    }
                });
    
                // Dispatch actions sequentially
                await Promise.all([
                    dispatch(setFirstName(response.data.message.firstname)),
                    dispatch(setLastName(response.data.message.lastname)),
                    dispatch(setEmail(response.data.message.email)),
                    dispatch(setHasPassword(response.data.message.hasPassword)),
                    dispatch(setPic(response.data.message.pfp)),
                    dispatch(setCountry(response.data.message.country)),
                    dispatch(setTel(response.data.message.tel)),
                    dispatch(setGoals(response.data.message.learning_goals)),
                    dispatch(setLife_Goals(response.data.message.goals)),
                    dispatch(setFocusThemes(response.data.message.focus_themes)),
                    dispatch(setTopics(response.data.message.interested_topics)),
                    dispatch(setComfortLevel(response.data.message.comfortlevel)),
                    dispatch(setBirthday(response.data.message.Birthday))
                ]);
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error);
                dispatch(setIsLoading(false))
            }
        };
        
        fetchData();
    }, []);

    
    const bodyContent = {
        CoursesSearch: <CoursesSearch></CoursesSearch>,
        TutorsSearch: <TutorsSearch></TutorsSearch>,
        Profile: <Body></Body>,
        ClassroomsSearch: <ClassroomsSearch></ClassroomsSearch>,
        ChatBot: <LinguaBuddy></LinguaBuddy>
    }
    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;



    const handleBody = () => {
        if (path === '/learner/profile') {
            return bodyContent.Profile
        }else if (path === '/learner/profile/Tutors') {
            return bodyContent.TutorsSearch
        }else if(path === '/learner/profile/LinguaBuddy'){
            return bodyContent.ChatBot
        }else if(path === '/learner/profile/Courses') {
            return bodyContent.CoursesSearch
        }else if(path === '/learner/profile/Classrooms') {
            return bodyContent.ClassroomsSearch
        }
    }

    return (
        <div className="w-screen h-screen bg-backg flex flex-col">
            <NavBar></NavBar>
            {
                handleBody()
            }
        </div>
    );
}

export default LearnerProfile;