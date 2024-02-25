import {useEffect, useRef} from 'react'
import { setListOfLanguagesVisibility, setListOfWorkExperienceVisibility } from '../../state/slices/listSlice';
import { useDispatch } from 'react-redux';
function Modal(props) {
    const modalRef = useRef(null)

    const dispatch = useDispatch()

    //when clicking outside of the modal we hide it 
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            if(props.title === 'Languages') {
                dispatch(setListOfLanguagesVisibility(false))
            }
            else if (props.title === 'Work Experience') {
                dispatch(setListOfWorkExperienceVisibility(false))
            }
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

    
    return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] z-50 flex justify-center items-center">
        <div ref={modalRef} className={`bg-backg w-[90%] px-5 py-3 md:w-[50%] lg:w-[35%] xl:w-[35%] max-h-[80%] min-h-[50%] flex flex-col justify-between rounded-md `} >
            <div className="flex space-x-2 py-3 items-center">
                {
                    props.icon
                }
                <span className="text-black text-xl">{props.title}</span>
            </div>
            {
                props.content
            }
        </div>
    </div>
    );
}

export default Modal;