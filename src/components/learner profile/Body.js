import Card from "./Card";
import GroupeLessonsCard from "./GroupeLessonsCard";
import ChatLessonCard from "./aichatLessonCard";
import StudyBuddyCard from "./StudyBuddyCard";
import StartedCard from "./StartedCard";
import TutorsCard from "./TutorsCard";
import CoursesCard from "./CoursesCard";

function Body() {

    const welcomeContent = [
            <img key="0"  src="/teach.jpg" alt="profilepicture"  className="w-20 h-20 object-cover rounded-full"></img>,
            <span key="1"  className="font-bold text-2xl text-center">Welcome to Linguify, YASSINE!</span>
    ]

    return (
        <div className="grid grid-cols-3 w-full h-[90%] overflow-y-auto px-28 py-7 gap-5">
            <div className="flex flex-col col-span-1 h-auto space-y-5">
                <Card content={welcomeContent}></Card>
                <GroupeLessonsCard></GroupeLessonsCard>   
                <StudyBuddyCard></StudyBuddyCard>   
                <ChatLessonCard></ChatLessonCard>
            </div>
            <div className="flex flex-col col-span-2 h-auto space-y-5">
                <StartedCard></StartedCard>  
                <TutorsCard></TutorsCard>
                <CoursesCard></CoursesCard>
            </div>
        </div>
    );
}

export default Body;