import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { fetchFile, isGoogleProfilePicture, timeFormatter } from "./functions"
import { useEffect, useState } from "react"
import ElapsedTime from "./ElapsedTime";
import { handleLessonDifficultyColor } from "./functions";
import { removeNotification, setPendingNotificationNumber, updateNotification } from "../../state/slices/NotificationSlice";
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from "../../interceptors/axiosInterceptor"
import socket from '../../interceptors/socketInterceptor'

function Notification(props) {
    
    //holding the picture
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch()
    const newNotifications = useSelector(state => state.notificationsData.pendingNotificationNumber)


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
                    imageUrl = await fetchFile(props.notification.pfp, 'images', 'Learner', props.notification.private_learner_id);
                }
                setImageUrl(imageUrl);
            } catch (err) {
                console.log(err);
                setImageUrl(null);
            }
        };
    
        fetchImageUrl();
    }, [])

    //make api call to confirm or reject lesson
    const notificationFeedBack = async (accepted, eventName) => {
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
                //sending notification to learner
                socket.emit(eventName, {
                    lesson: props.notification.lesson_id,
                    learnerId: props.notification.private_learner_id
                })
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
            const result = await notificationFeedBack(1, 'approveLesson')
            dispatch(updateNotification({ notification: props.notification, accepted: 1}))
            dispatch(setPendingNotificationNumber(newNotifications-1))
            console.log(result);
        }catch(err) {
            console.log(err)
        }
    }
    
    const handleRejectLesson = async () => {
        try{
            const result = await notificationFeedBack(0, 'cancelLesson')
            dispatch(removeNotification(props.notification.lesson_id))
            dispatch(setPendingNotificationNumber(newNotifications-1))
            
            console.log(result);
        }catch(err) {
            console.log(err)
        }
    }

    return (
         <div className="flex p-2 space-x-2 hover:bg-backg rounded-lg items-center py-4 border-b">
            {
                imageUrl? 
                <img 
                alt="pfp" 
                src={imageUrl}
                referrerPolicy="no-referrer"
                className="min-w-16 max-w-16 max-h-16 rounded-full self-start min-h-16 object-cover"></img>
                : 
                <div className="min-w-16 animate-pulse bg-darkg max-w-16 max-h-16 rounded-full self-start min-h-16 object-cover">
                </div>
            }
            <div className="flex flex-col self-start space-y-1">
                <div className="text-sm">
                    {
                        props.notification.Accepted === -1? 
                        <span className="text-darkg"><span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span> wants to book <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with you <span className="">from</span> <span className="text-black font-bold">{timeFormatter(props.notification.start_time)}</span> to <span className="font-bold text-black">{timeFormatter(props.notification.end_time)}</span> on <span className="text-black font-semibold">{handleTimeFormat()}.</span></span>
                        :
                        (props.notification.Accepted ===1?
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
                        :
                        <span className="text-darkg"> 
                            <span>You <span className="text-errortext font-bold">rejected</span> <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with </span>
                            <span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span>
                            <span className=""> from </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.start_time)}</span>
                            <span className=""> to </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.end_time)}</span>
                            <span className=""> on </span>
                            <span className="font-semibold text-black">{handleTimeFormat()}.</span>
                        </span>)
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