import Card from "./Card";

function StudyBuddyCard(props) {
    const content = [
        <img key="image" src="/studdy_buddy.png" alt="buddy" className="w-40 h-40"></img>,
        <div key="text" className="flex flex-col self-start justify-center items-center space-y-1">
            <span className="font-bold text-xl self-start">Make new StudyPals</span>
            <span className="text-sm self-start text-left">Check off the list of every student you studied with.</span>
        </div>,
        <button key="button" className="border border-button text-button rounded-2xl h-10 bg-lightbutton flex justify-center items-center text-sm font-bold w-full">Make StudyPals</button>
    ]
    return (
        <Card content={content}></Card>
    );
}

export default  StudyBuddyCard