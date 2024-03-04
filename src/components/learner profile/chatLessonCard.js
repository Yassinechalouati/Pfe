import Card from "./Card";

function ChatLessonCard() {
    const content = [
        <img key="image" src="/chatbot-bro.png" alt="chatbot" className="w-32 h-32">
            
        </img>,
        <div key="text" className="flex flex-col justify-center items-center space-y-1">
            <span className="font-bold self-start">Session with LinguaBuddy</span>
            <span className="text-sm self-start"> Practice speaking English with ai for free today!</span>
        </div>,
        <div className="border border-button text-button rounded-2xl h-10 bg-lightbutton flex justify-center items-center text-sm font-bold w-full">Start a chat with LinguaBuddy</div>

    ]

    return (
        <Card content={content}></Card>
    );
}

export default ChatLessonCard;