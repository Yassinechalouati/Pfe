import { IoChatbubbles } from "react-icons/io5"
import { IoMdCalendar } from "react-icons/io";
import { BsRobot } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useRef, useState } from "react";
import Drawer from "./Drawer";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import DropdownMenu from "./DropdownMenu";
import Notifications from "./LessonNotifications";
import MessagesNotif from "../Global/MessagesNotif";


 

function NavBar() {
    //handle drawer visibility
    const [isOpen, setIsOpen] =useState(false)
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const pfpRef = useRef(null)

    const learnerData = useSelector(state => state.userData)
    
    
    const handleDrawer = () => {
        setIsOpen(true)
    }


    //handle DropDown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

    return (
        <>
            <div className="h-[10%] w-full bg-white z-10 shadow flex items-center space-x-8 pr-10 pl-10 md:pr-10 ">
                    <NavLink to="/learner/profile"
                        className="flex lg:hidden justify-center nav-link items-center h-full w-[150px] space-x-2"
                    >
                        <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                        <div className="font-bold text-xl ">LINGUIFY</div>
                    </NavLink>
                    <nav className="justify-center relative hidden lg:flex items-center w-auto h-full">
                        <NavLink to="/learner/profile"
                            className="flex justify-center nav-link items-center h-full w-[150px] space-x-2"
                        >
                            <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                            <div className="font-bold text-xl ">LINGUIFY</div>
                        </NavLink>
                        <NavLink
                            to="/learner/profile/Tutors"
                            className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center"
                        >
                            <span className="text-darkg">Tutors</span>
                        </NavLink>
                        <NavLink
                            to="/learner/profile/Courses"
                            className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center"
                        >
                            <span className="text-darkg">Courses</span>
                        </NavLink>
                        <NavLink
                            to="/learner/profile/LinguaBuddy"
                            className="flex nav-link no-underline h-full w-[140px] justify-center cursor-pointer items-center space-x-2"
                        >
                            <BsRobot color="#F28585" size="22"></BsRobot>
                            <span className="text-darkg">LinguaBuddy</span>
                        </NavLink>
                        <div className="animation startprofile"></div>
                    </nav>
                    <div className="flex-grow"></div>
                    <div className=" ml-auto flex items-center w-auto h-full space-x-2 lg:space-x-6">
                        <button className="bg-elements text-white font-bold py-2 px-8 rounded-full hover:shadow-md">
                            Subscribe
                        </button>
                        <div className="py-2 lg:hidden cursor-pointer px-2 flex justify-center items-center bg-button rounded-full">
                            <IoMenu onClick={handleDrawer} size="22" color="white"></IoMenu>
                        </div>
                        <MessagesNotif></MessagesNotif>
                        <Notifications></Notifications>
                        <NavLink to ="/learner/profile/Calendar">
                            <IoMdCalendar className="cursor-pointer hidden lg:block" color="#767676" size="22"></IoMdCalendar>
                        </NavLink>
                        {
                            learnerData.isLoading?
                            <div className="rounded-full hidden lg:block animate-pulse bg-darkg w-12 h-12 self-center"></div>
                            :
                            <div className="relative">
                                <img 
                                    ref={pfpRef}
                                    src={`${learnerData.pic==="user.png" ? "/" +learnerData.pic: learnerData.pic }`} 
                                    alt="profilepicture" 
                                    referrerPolicy="no-referrer"
                                    className="cursor-pointer hidden lg:block rounded-full min-w-10 min-h-10 w-12 h-12 object-cover"
                                    onClick={toggleDropdown}
                                />
                                <DropdownMenu pfpRef={pfpRef} isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                            </div>
                            
                        }
                    </div>
                </div>
                <Drawer userData={learnerData} role="learner" isOpen={isOpen} closeDrawer={() => setIsOpen(!isOpen)}/>
        </>
    );
}

export default NavBar;