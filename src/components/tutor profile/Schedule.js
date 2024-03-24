
import { IoMdCalendar } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useRef, useEffect } from "react";

function Schedule(props) {
    const modalRef = useRef(null)

     //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
     const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            props.setVisibility(false)
        }
      };

    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);


    return (<>
            {
                props.visibility?
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
                    <div ref={modalRef} className=" bg-white shadow-lg rounded-lg p-6 z-30">
                        <span className="block text-center text-darkg text-lg mb-4">Schedule a Lesson</span>
                        <div className="flex items-center space-x-2 mb-4"> 
                            <IoMdCalendar size="25" className="text-darkg"></IoMdCalendar>
                            <span className="text-darkg">{props.selectedDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4"> 
                            <IoMdTime size="25" className="text-darkg"></IoMdTime>
                            <span className="text-darkg">Select Time</span>
                            <input type="time" className="border z-50 border-gray-300 px-2 py-1 rounded-md" />
                        </div>
                        <div className="flex items-center space-x-2 mb-4"> 
                            <IoIosTimer size="25" className="text-darkg"></IoIosTimer>
                            <span className="text-darkg">Lesson Length</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4"> 
                            <FaChalkboardTeacher size="25" className="text-darkg"></FaChalkboardTeacher>
                            <span className="text-darkg">Select Tutor</span>
                        </div>
                        <div className="flex justify-end"> 
                            <button className="px-4 py-2 bg-button text-white rounded-lg ">Continue</button>
                        </div>
                    </div>
                </div>
                :
                null
            }
    </>
    );
}

export default Schedule;