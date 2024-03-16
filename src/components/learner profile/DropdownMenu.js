import { MdOutlinePayment } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoChatbubbles } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router-dom";



//drop down menu when clicking the user profile
const DropdownMenu = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`absolute hidden lg:block right-0 mt-2 w-48 bg-white border border-lightg rounded-md shadow-lg z-10 ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} transition-transform duration-300 transform origin-top-right`}
    >
      <div className="py-1 px-2">
        <div className="flex items-center px-2 rounded-lg hover:bg-button2 transition-colors hover:text-white duration-300 text-darkg cursor-pointer">
            <MdOutlinePayment size="20"></MdOutlinePayment>
            <a href="#" className="block px-4 py-2 ">Subscribe</a>
        </div>
        <NavLink to="/learner/profile/Settings" className="flex items-center px-2 rounded-lg hover:bg-button2 transition-colors hover:text-white duration-300 text-darkg cursor-pointer">
            <IoMdSettings size="20"></IoMdSettings>
            <div href="#" className="block px-4 py-2">Settings</div>
        </NavLink>
        <div className="flex items-center px-2 rounded-lg hover:bg-button2  transition-colors hover:text-white duration-300 text-darkg cursor-pointer">
            <IoChatbubbles size="20"></IoChatbubbles>
            <a href="#" className="block px-4 py-2">Messages</a>
        </div>
        <hr className="w-full h-1"></hr>
        <div className="flex items-center px-2 rounded-lg hover:bg-button2 transition-colors hover:text-white duration-300 text-darkg cursor-pointer">
            <IoLogOut size="20" color="red"></IoLogOut>
            <a href="#" className="block px-4 py-2">Log out</a>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
