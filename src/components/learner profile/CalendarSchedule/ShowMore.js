import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { setVisibility } from "../../../state/slices/ShowMore";
import { IoMdCalendar } from "react-icons/io"

function ShowMore(props) {
    const modalRef = useRef(null)
    const dispatch = useDispatch()
    const visibility = useSelector(state => state.showMoreData.visibility)

    //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            dispatch(setVisibility(false))
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
                visibility?
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
                    <div ref={modalRef} className="max-h-[70%] bg-backg flex flex-col justify-center max-w-[90%] lg:max-w-[40%] space-y-5 shadow-lg rounded-lg p-6 z-30">
                        <span className="text-center">Booked lessons</span>
                        <div className="flex p-2 items-center space-x-6"> 
                            <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                            <span className="text-active">{props.selectedDate}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className=""></div>
                            <img className="w-20 h-20 object-cover rounded-full" alt="tutorface" src="/teach.jpg"></img>
                        </div>
                    </div>
                </div>
                :
                null
            }
    </>
    );
}

export default ShowMore;




