import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { setVisibility } from "../../../state/slices/ShowMore";
import { IoMdCalendar } from "react-icons/io"
import { IoMdTime } from "react-icons/io"


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
                        <span className="block text-center text-black font-semibold text-lg">Booked lessons</span>
                        <div className="flex p-2 items-center justify-center space-x-6"> 
                            <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                            <span className="text-active">{props.selectedDate}</span>
                        </div>
                        <div className="flex flex-col space-y-3 justify-center">
                            <div className="flex p-2 rounded-lg hover:bg-lightg space-x-3 items-center">
                                <img className="min-w-20 h-20 object-cover rounded-full" alt="tutorface" src="/random.jpg"></img>
                                <div className="flex flex-col space-y-1 justify-center">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-base">English lesson</span>
                                        <div className="flex items-center space-x-1">
                                            <IoMdTime className="text-darkg" size="15"></IoMdTime>
                                            <span className="text-darkg text-xs ">
                                                2:20 - 3:20
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <div className="bg-lightGreen text-xs p-1 border border-elements text-elements rounded-xl">
                                                On hold
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm" >Tutor: User User</span>
                                    <div className="flex">
                                        <div className="bg-lightGreen text-xs p-1 border border-elements text-elements rounded-xl">
                                            Advanced
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex p-2 rounded-lg space-x-3 hover:bg-lightg  items-center">
                                <img className="min-w-20 h-20 object-cover rounded-full" alt="tutorface" src="/random.jpg"></img>
                                <div className="flex flex-col space-y-1 justify-center">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-base">English lesson</span>
                                        <div className="flex items-center space-x-1">
                                            <IoMdTime className="text-darkg" size="15"></IoMdTime>
                                            <span className="text-darkg text-xs ">
                                                2:20 - 3:20
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <div className="bg-lightGreen text-xs p-1 border border-elements text-elements rounded-xl">
                                                On hold
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm" >Tutor: User User</span>
                                    <div className="flex">
                                        <div className="bg-lightGreen text-xs p-1 border border-elements text-elements rounded-xl">
                                            Advanced
                                        </div>
                                    </div>
                                </div>
                            </div>
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




