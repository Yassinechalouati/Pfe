
import { fetchFile, isGoogleProfilePicture, timeFormatter } from "../Global/functions"
import { useEffect, useState } from "react"
import ElapsedTime from "../Global/ElapsedTime";
import { handleLessonDifficultyColor } from "../Global/functions"

function Notification(props) {
    
    //holding the picture
    const [imageUrl, setImageUrl] = useState(null);



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
                    console.log("it is google profile picture pfp:", props.notification.pfp, "id: ", props.notification.tutor_id);
                    imageUrl = await fetchFile(props.notification.pfp, 'images', 'tutor', props.notification.tutor_id);
                }
                setImageUrl(imageUrl);
            } catch (err) {
                console.log(err);
                setImageUrl(null);
            }
        };
    
        fetchImageUrl();
    }, [])

    return (
         <div className="flex p-2 space-x-2 hover:bg-backg rounded-lg items-center py-4 border-b">
            <img 
            alt="pfp" 
            src={imageUrl}
            referrerPolicy="no-referrer"
            className="min-w-16 max-w-16 max-h-16 rounded-full self-start min-h-16 object-cover"></img>
            <div className="flex flex-col self-start space-y-1">
                <div className="text-sm">
                    {
                        props.notification.Accepted === -1? 
                        <span className="text-darkg">You requested <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with <span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span> <span className="">from</span> <span className="text-black font-bold">{timeFormatter(props.notification.start_time)}</span> to <span className="font-bold text-black">{timeFormatter(props.notification.end_time)}</span> on <span className="text-black font-semibold">{handleTimeFormat()}.</span></span>
                        :
                        (props.notification.Accepted === 1?
                        <span className="text-darkg"> 
                            <span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span>
                            <span> <span className="text-elements">Accepted</span> your <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson request</span>
                            <span className=""> from </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.start_time)}</span>
                            <span className=""> to </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.end_time)}</span>
                            <span className=""> on </span>
                            <span className="font-semibold text-black">{handleTimeFormat()}.</span>
                        </span>
                        :
                        <span className="text-darkg"> 
                            <span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span>
                            <span> <span className="text-errortext">rejected</span> your <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson request</span>
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
        </div>
    );
}

export default Notification;