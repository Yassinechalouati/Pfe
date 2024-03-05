import Card from "./Card";
import Tutor from "./Tutor";

function TutorsCard(props) {
    
    const content =[
        <div className="flex w-full justify-between  items-center">
            <span className="text-lg font-bold mb-5">
                Tutors for you
            </span>
            <button className="border border-button text-button rounded-2xl h-10 bg-lightbutton px-3 flex justify-center items-center text-sm font-bold">See all</button>
        </div>,
        <hr className="h-1 w-full"></hr>,
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            <Tutor></Tutor>
            <Tutor></Tutor>
            <Tutor></Tutor>
        </div>

    ]

    return (
        <Card content={content}></Card>
    );
}

export default TutorsCard;