import { IoChatbubbles } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { BsRobot } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Drawer from "./Drawer";



function NavBar() {
    const [isOpen, setIsOpen] =useState(false)

    const handleDrawer = () => {
        setIsOpen(true)
    }
    return (
        <>
            <div className="h-[10%] w-full bg-white shadow flex items-center space-x-8 px-10 ">
                    <div className="flex justify-center items-center h-full w-auto space-x-2">
                        <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                        <div className="font-bold text-xl ">LINGUIFY</div>
                    </div>
                    <div className="justify-center hidden lg:flex items-center w-auto h-full space-x-6">
                        <div className="flex justify-center cursor-pointer items-center space-x-2">
                            <div className="relative h-full cursor-pointer">
                                <span className="text-darkg">Tutors</span>
                                <div className="absolute left-1/2 right-1/2 w-2 h-2 bg-button rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-center cursor-pointer items-center space-x-2">
                            <div className="relative h-full cursor-pointer">
                                <span className="text-darkg">Courses</span>
                                <div className="absolute left-1/2 right-1/2 w-2 h-2 bg-button rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-center cursor-pointer items-center space-x-2">
                            <div className="relative h-full cursor-pointer">
                                <span className="text-darkg">Classrooms</span>
                                <div className="absolute left-1/2 right-1/2 w-2 h-2 bg-button rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-center cursor-pointer items-center space-x-2">
                            <BsRobot color="#F28585" size="22"></BsRobot>
                            <div className="relative h-full cursor-pointer">
                                <span className="text-darkg">LinguaBuddy</span>
                                <div className="absolute left-1/2 right-1/2 w-2 h-2 bg-button rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow"></div>
                    <div className=" ml-auto flex items-center w-auto h-full space-x-2 lg:space-x-6">
                        <button className="bg-elements text-white font-bold py-2 px-8 rounded-full hover:shadow-md">
                            Subscribe
                        </button>
                        <div className="py-2 lg:hidden cursor-pointer px-2 flex justify-center items-center bg-button rounded-full">
                            <IoMenu onClick={handleDrawer} size="22" color="white"></IoMenu>
                        </div>
                        <IoChatbubbles className="cursor-pointer hidden lg:block" color="#767676" size="22"></IoChatbubbles>
                        <IoNotifications className="cursor-pointer hidden lg:block" color="#767676" size="22"></IoNotifications>
                        <IoMdCalendar className="cursor-pointer hidden lg:block" color="#767676" size="22"></IoMdCalendar>
                        <img src="/user.png" alt="prolfiepicture" className="cursor-pointer hidden lg:block rounded-full w-12 h-12 object-cover"></img>
                    </div>
                </div>
                <Drawer isOpen={isOpen} closeDrawer={() => setIsOpen(!isOpen)}/>
        </>
    );
}

export default NavBar;