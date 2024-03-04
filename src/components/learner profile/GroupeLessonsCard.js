import Card from "./Card";
import { MdOutlineNavigateNext } from "react-icons/md";

function GroupeLessonsCard() {
    
    const content = [
        <div key="0" className="flex font-semibold justify-between items-center w-full">
            <span>Classrooms now available</span>
            <div className="flex justify-center border cursor-pointer border-button rounded-full bg-lightbutton items-center w-10 h-10">
                <MdOutlineNavigateNext size="22" color="#FFA447"></MdOutlineNavigateNext>
            </div>
        </div>
        ]

    return (
        <Card content={content}></Card>
    );
}

export default GroupeLessonsCard;