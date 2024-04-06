
import { MdNavigateBefore } from "react-icons/md"
import {useDispatch, useSelector} from 'react-redux'
import { IoMdCalendar } from "react-icons/io"
import {useState, useEffect} from 'react'
import axiosInstance from "../../../interceptors/axiosInterceptor"
import { setTutorSearchList } from "../../../state/slices/userSlice"
import Loading from "../../Global/Loading"
import TutorRow from "./TutorRow"



function ThirdStep(props) {   
    const dispatch = useDispatch()
    const learnerData = useSelector(state => state.userData)

    const [loading, setLoading] = useState(false)


    //getting the tutors from database
    async function fetchData () {
        try {
                setLoading(true)
                const response = await axiosInstance.post('http://localhost:5000/SearchTutors', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                    }
                });
                dispatch(setTutorSearchList(response.data.message))
                setLoading(false)
            }catch(err) {
                console.log(err)
                setLoading(false)
            }
    }

    //this function only fires when the list is empty 
    useEffect(() => {
        if(!learnerData.tutorSearchList || learnerData.tutorSearchList.length === 0) {
            fetchData()
        }
    }, [])



    
    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <MdNavigateBefore onClick={props.moveBackwards} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
                <span className="block text-center text-black font-semibold text-lg">Select Tutor</span>
            </div>
            <div className="flex justify-center p-2 items-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            <input
                type="search"
                placeholder="Search for tutor..."
                className="w-full mb-5 px-4 py-2 border rounded-xl focus:outline-none focus:border-elements transition-colors duration-300"
                />
            <div className="overflow-y-auto py-4 pr-5 w-full flex flex-col space-y-4">
                {
                    loading?
                    <Loading></Loading>
                    :
                    learnerData.tutorSearchList.map((tutor, index) => {
                        return <TutorRow key={index} moveForward={props.moveForward} tutor={tutor}></TutorRow>
                    })

                }
            </div>
        </>
    );
}

export default ThirdStep;