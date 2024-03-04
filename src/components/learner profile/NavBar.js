import { IoChatbubbles } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { BsRobot } from "react-icons/bs";


function NavBar() {
    return (
        <div className="h-[10%] w-full bg-white shadow flex items-center space-x-8 px-10 ">
                <div className="flex justify-center items-center h-full w-auto space-x-2">
                    <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                    <div className="font-bold text-xl ">LINGUIFY</div>
                    
                </div>
                <div className="flex justify-center items-center w-auto h-full space-x-6">
                    <div className="text-darkg cursor-pointer">Courses</div>
                    <div className="text-darkg cursor-pointer">Classrooms</div>
                    <div className="flex justify-center cursor-pointer items-center space-x-2">
                        <BsRobot color="#F28585" size="22"></BsRobot>
                        <div className="text-darkg cursor-pointer">LinguaBuddy</div>
                    </div>
                </div>
                <div className="flex-grow"></div>
                <div className=" ml-auto flex items-center w-auto h-full space-x-6">
                    <button className="bg-elements text-white font-bold py-2 px-8 rounded-full hover:shadow-md">
                        Subscribe
                    </button>
                    <IoChatbubbles className="cursor-pointer" color="#767676" size="22"></IoChatbubbles>
                    <IoNotifications className="cursor-pointer" color="#767676" size="22"></IoNotifications>
                    <IoMdCalendar className="cursor-pointer" color="#767676" size="22"></IoMdCalendar>
                    <img src="/user.png" alt="prolfiepicture" className="cursor-pointer rounded-full w-12 h-12 object-cover"></img>
                </div>
            </div>
    );
}

export default NavBar;