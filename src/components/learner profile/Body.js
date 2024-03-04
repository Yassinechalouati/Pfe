import Card from "./Card";
import GroupeLessonsCard from "./GroupeLessonsCard";
import ChatLessonCard from "./chatLessonCard";

function Body() {

    const welcomeContent = [
            <img key="0"  src="/teach.jpg" alt="profilepicture"  className="w-20 h-20 object-cover rounded-full"></img>,
            <span key="1"  className="font-bold text-2xl text-center">Welcome to Linguify, YASSINE!</span>
    ]

    return (
        <div className="grid grid-cols-3 w-full overflow-y-auto px-28 py-7 gap-5">
            <div className="flex flex-col col-span-1 h-auto space-y-5">
                <Card content={welcomeContent}></Card>
                <GroupeLessonsCard></GroupeLessonsCard>      
                <ChatLessonCard></ChatLessonCard>
            </div>
            <div className="flex flex-col col-span-2 h-auto">
                <div className="rounded-2xl py-5 h-auto flex-col flex justify-center items-center shadow bg-white">
                    <img src="/user.png" alt="profilepicture"  className="w-14 h-14 object-cover"></img>
                    <span>yoyo</span>
                </div>            
            </div>
        </div>
    );
}

export default Body;