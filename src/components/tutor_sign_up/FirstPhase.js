
function FirstPhase() {
    return (
        <div className="w-full h-[80%] flex flex-col md:flex-row justify-center items-center space-x-4 ">
            <img src="/tutor.png" alt="tutor" className="object-cover h-56 w-56 md:h-80 md:w-80"></img>
            <div className="flex flex-col w-[90%] md:w-[30%] space-y-2 text-center">
                <span className="text-xl font-bold text-black">
                    You are about to start an amazing journey
                </span>
                <span className="text-sm text-darkg">
                Welcome, esteemed tutors! Your presence enriches our community and ignites excitement among our students. With your warmth and expertise, students quickly gain confidence in English conversation. The signup process takes about 15 minutes, and we're here to guide you every step. Together, let's inspire language mastery and foster meaningful connections!
                </span>
            </div>
        </div>
    );
}

export default FirstPhase;