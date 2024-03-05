import Card from "./Card";
import Course from "./Course";

function CoursesCard(props) {
    const content = [
        <div className="flex w-full justify-between">
            <span className="self-start text-lg font-bold mb-5">
                Try a course (they're free)
            </span>
            <button className="border border-button text-button rounded-2xl h-10 bg-lightbutton px-3 flex justify-center items-center text-sm font-bold">See more</button>
        </div>,
        <hr className="h-1 w-full"></hr>,
        <div className="flex w-full justify-between">
            <Course></Course>
            <Course></Course>
            <Course></Course>
        </div>

    ]
    return (
        <Card content={content}></Card>
    );
}

export default CoursesCard;