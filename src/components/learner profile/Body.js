import Card from "./Card";
import GroupeLessonsCard from "./GroupeLessonsCard";
import ChatLessonCard from "./aichatLessonCard";
import StudyBuddyCard from "./StudyBuddyCard";
import StartedCard from "./StartedCard";
import TutorsCard from "./TutorsCard";
import CoursesCard from "./CoursesCard";
import { useSelector } from "react-redux";

function Body() {
    const learnerData = useSelector(state => state.userData)

    const welcomeContent = [
            <img key="0"  src={`${learnerData.pic? learnerData.pic : "/user.png"}`}  alt="profilepicture"  className="w-20 h-20 object-cover rounded-full"></img>,
            <span key="1"  className="font-bold text-2xl text-center">Welcome to Linguify, {learnerData.firstname+" "+learnerData.lastname}!</span>
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7 gap-5">
            <div className="flex flex-col col-span-1 h-auto space-y-5">
                <Card content={welcomeContent}></Card>
                <GroupeLessonsCard></GroupeLessonsCard>   
                <StudyBuddyCard></StudyBuddyCard>   
                <ChatLessonCard></ChatLessonCard>
            </div>
            <div className="flex flex-col col-span-1 md:col-span-2 h-auto space-y-5">
                <StartedCard></StartedCard>  
                <TutorsCard></TutorsCard>
                <CoursesCard></CoursesCard>
            </div>
        </div>
    );
}

export default Body;