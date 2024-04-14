import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { fetchFile, isGoogleProfilePicture, timeFormatter } from "./functions"
import { useEffect, useState } from "react"
import ElapsedTime from "./ElapsedTime";
import { handleLessonDifficultyColor } from "./functions";
import { updateNotification } from "../../state/slices/NotificationSlice";
import { useDispatch} from 'react-redux'
import axiosInstance from "../../interceptors/axiosInterceptor";

function Notification(props) {
    
    //holding the picture
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch()


    // Format the date to display as "Month Day, Year"
    const handleTimeFormat = () => {
        const date = new Date(props.notification.start_time);

        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options)

        return formattedDate
    }

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                let imageUrl = props.notification.pfp;
                if (!isGoogleProfilePicture(props.notification.pfp)) {
                    imageUrl = await fetchFile(props.notification.pfp, 'image', 'Learner', props.notification.private_learner_id);
                }
                setImageUrl(imageUrl);
            } catch (err) {
                console.log(err);
                setImageUrl(null);
            }
        };
    
        fetchImageUrl();
    }, [props.notification.pfp, props.notification.private_learner_id])

    //make api call to confirm or reject lesson
    const notificationFeedBack = async (accepted) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post('http://localhost:5000/tutor/NotificationFeedback', {
                lessonId: props.notification.lesson_id,
                accepted: accepted
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            .then((response) => {
                console.log("response from NotificationFeedBack: ", response.data.message)
                resolve("Accepted")
            })
            .catch((err) => {
                console.log(err)
                reject("Operation Error!")
            })
        })
    }


    const handleAcceptLesson = async () => {
        try {
            const result = await notificationFeedBack(1)
            dispatch(updateNotification({ notification: props.notification, accepted: 1}))
            console.log(result);
        }catch(err) {
            console.log(err)
        }
    }
    
    const handleRejectLesson = async () => {
        try{
            const result = await notificationFeedBack(0)
            dispatch(updateNotification({ notification: props.notification, accepted: 0}))
            console.log(result);
        }catch(err) {
            console.log(err)
        }
    }

    return (
         <div className="flex p-2 space-x-2 hover:bg-backg rounded-lg items-center py-4 border-b">
            <img alt="pfp" src={imageUrl} className="w-16 rounded-full self-start h-16 object-cover"></img>
            <div className="flex flex-col self-start space-y-1">
                <div className="text-sm">
                    {
                        props.notification.Accepted === -1? 
                        <span className="text-darkg"><span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span> wants to book <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with you <span className="">from</span> <span className="text-black font-bold">{timeFormatter(props.notification.start_time)}</span> <span className="font-bold text-black">{timeFormatter(props.notification.end_time)}</span> on <span className="text-black font-semibold">{handleTimeFormat()}.</span></span>
                        :
                        <span className="text-darkg"> 
                            <span>You have <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with </span>
                            <span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span>
                            <span className=""> from </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.start_time)}</span>
                            <span className=""> to </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.end_time)}</span>
                            <span className=""> on </span>
                            <span className="font-semibold text-black">{handleTimeFormat()}.</span>
                        </span>
                    }
                </div>
                <div className="flex space-x-2">
                    <div className={`text-button bg-lightbutton text-xs p-1 border border-button rounded-xl`}>
                        {props.notification.language}
                    </div>
                    <div className={`${handleLessonDifficultyColor(props.notification.lesson_difficulty, 'other')} text-xs p-1 border rounded-xl`}>
                        {props.notification.lesson_difficulty}
                    </div>
                </div>
                <span className="text-button2 text-xs">
                    Booked {ElapsedTime(props.notification.scheduling_date)}
                </span>
            </div>
            {
                props.notification.Accepted === -1?
                <div className="flex items-center self-start space-x-1">
                    <IoCheckmarkCircle onClick={handleAcceptLesson} className="text-elements cursor-pointer" size="25"></IoCheckmarkCircle>
                    <IoCloseCircle onClick={handleRejectLesson} className="text-errortext cursor-pointer" size="25"></IoCloseCircle>
                </div>
                :
                null
            }
        </div>
    );
}

export default Notification;