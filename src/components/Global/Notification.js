import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

function Notification(props) {
    return (
         <div className="flex p-2 space-x-2 hover:bg-backg rounded-lg items-center py-4 border-b">
            <img alt="pfp" src="/teach.jpg" className="w-16 rounded-full h-16 object-cover"></img>
            <div className="flex flex-col space-y-1">
                <div className="text-sm">
                    <span className="font-semibold text-black">User User </span><span className="text-darkg">wants to book a lesson with you on the 5th of April</span>
                </div>
                <span className="text-darkg text-sm">
                    1 minutes ago
                </span>
            </div>
            <div className="flex items-center self-start space-x-1">
                <IoCheckmarkCircle className="text-elements cursor-pointer" size="25"></IoCheckmarkCircle>
                <IoCloseCircle className="text-errortext cursor-pointer" size="25"></IoCloseCircle>
            </div>
        </div>
    );
}

export default Notification;