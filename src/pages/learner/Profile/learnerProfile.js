import Body from "../../../components/learner profile/Body";
import NavBar from "../../../components/learner profile/NavBar";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { useEffect } from "react";
import { setBirthday, setComfortLevel, setCountry, setEmail, setFirstName, setFocusThemes, setGoals, setHasPassword, setLastName, setLife_Goals, setPic, setTel, setTopics } from "../../../state/slices/userSlice";
import { useDispatch } from "react-redux";

function LearnerProfile() {

    const dispatch = useDispatch()

    const fetchData = async () => {
        try {
            const response = await axiosInstance.post('http://localhost:5000/learner/details', {},  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            })
            //getting learner data from server
            console.log(response)
            dispatch(setFirstName(response.data.message.firstname))
            dispatch(setLastName(response.data.message.lastname))
            dispatch(setEmail(response.data.message.email))
            dispatch(setHasPassword(response.data.message.hasPassword))
            dispatch(setPic(response.data.message.pfp))
            dispatch(setCountry(response.data.message.country))
            dispatch(setTel(response.data.message.tel))
            dispatch(setGoals(response.data.message.learning_goals))
            dispatch(setLife_Goals(response.data.message.goals))
            dispatch(setFocusThemes(response.data.message.focus_themes))
            dispatch(setTopics(response.data.message.interested_topics))
            dispatch(setComfortLevel(response.data.message.comfortlevel))
            dispatch(setBirthday(response.data.message.Birthday))
        }catch(error) {
            console.log(error)

        }
        
    }
    
    useEffect(()=> {
        fetchData()
    }, [])


    return (
        <div className="w-screen h-screen bg-backg flex flex-col">
            <NavBar></NavBar>
            <Body></Body>
        </div>
    );
}

export default LearnerProfile;