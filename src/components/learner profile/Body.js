import Card from "./Card";
import GroupeLessonsCard from "./GroupeLessonsCard";
import ChatLessonCard from "./aichatLessonCard";
import StudyBuddyCard from "./StudyBuddyCard";
import StartedCard from "./StartedCard";
import TutorsCard from "./TutorsCard";
import CoursesCard from "./CoursesCard";
import { useSelector } from "react-redux";
import { ColumnLoading, ColumnRowLoading, RowCardsLoading, RowLoading } from "../Global/LoadingCards";

function Body() {
    const learnerData = useSelector(state => state.userData)

    const welcomeContent = [
            <img key="0"  src={`${learnerData.pic? learnerData.pic : "/user.png"}`}  alt="profilepicture"  className="w-20 h-20 object-cover rounded-full"></img>,
            <span key="1"  className="font-bold text-2xl text-center">Welcome to Linguify, {learnerData.firstname+" "+learnerData.lastname}!</span>
    ]


    //content to show the component has finished loading
    const loadedContent = [
        <div key="loaded" className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7 gap-5">
            <div key="leftpart" className="flex flex-col col-span-1 h-auto space-y-5">
                <Card content={welcomeContent}></Card>
                <GroupeLessonsCard></GroupeLessonsCard>   
                <StudyBuddyCard></StudyBuddyCard>   
                <ChatLessonCard></ChatLessonCard>
            </div>
            <div key="rightpart" className="flex flex-col col-span-1 md:col-span-2 h-auto space-y-5">
                <StartedCard></StartedCard>  
                <TutorsCard></TutorsCard>
                <CoursesCard></CoursesCard>
            </div>
        </div>
    ]

    //content to show when the component is loading
    const loadingContent = [
        <div key="loading" className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7 gap-5">
            <div key="leftpart" className="flex flex-col col-span-1 h-auto space-y-5">
                <ColumnLoading></ColumnLoading>
                <RowLoading></RowLoading>
                <ColumnLoading></ColumnLoading>
                <ColumnLoading></ColumnLoading>
            </div>
            <div key="right part" className="flex flex-col col-span-1 md:col-span-2 h-auto space-y-5">
                <ColumnRowLoading></ColumnRowLoading> 
                <RowCardsLoading></RowCardsLoading>
                <RowCardsLoading></RowCardsLoading>
            </div>
        </div>
    ]

    return (
        <>
            {
                learnerData.isLoading?
                loadingContent
                :
                loadedContent
            }
        </>
    );
}

export default Body;