import { IoIosCloseCircle } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";


function Drawer(props) {
    return (
        <>
            <div className={`${props.isOpen ? "opacity-30" : "opacity-0 pointer-events-none" } lg:hidden absolute inset-0 bg-black  z-10 transition-opacity ease-in-out duration-300  `}></div>
            <div className={`fixed lg:hidden inset-y-0 right-0 bg-white max-w-xs transform transition-transforml duration-300 z-20 shadow-lg w-full ${props.isOpen? "translate-x-0" : "translate-x-full"} `}>
                
                <div className="flex flex-col items-start space-y-8 lg:px-12 px-9 pt-5 ">
                    <div className=" flex justify-end w-full">
                        <IoIosCloseCircle onClick={props.closeDrawer} size="22"/>
                    </div>
                    <div className="flex flex-col space-y-6 w-full">
                        <div className="flex">
                            <IoNotifications size="10" color="white"></IoNotifications>
                            <span> Notificaiton</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Drawer;
