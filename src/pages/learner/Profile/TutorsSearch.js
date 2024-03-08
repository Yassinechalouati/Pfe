import { useEffect } from "react";
import TutorSearchCard from "../../../components/learner profile/TutorSearchCard";
import { setIsLoading } from "../../../state/slices/userSlice";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { useDispatch } from "react-redux";

function TutorsSearch(props) {

    const dispatch = useDispatch()

    async function fetchData () {
        dispatch(setIsLoading(true))
            try {
                const response = await axiosInstance.post('http://localhost:5000/SearchTutors', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                    }
                });
                console.log(response);
            }catch(err) {
                console.log(err)
            }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
            <div className="flex flex-col space-y-4 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7">
                <div className="flex w-full items-center space-x-8 ">
                    <span className="font-bold text-2xl text-center"> Find a Tutor</span>
                    <span className="cursor-pointer">All</span>
                    <span className="  ">Online</span>
                    <span className="  ">Favorites</span>
                </div>
                <input
                type="search"
                placeholder="Search for tutor..."
                className="w-full mb-5 px-4 py-2 border rounded-xl focus:outline-none focus:border-elements transition-colors duration-300"
                />
                <div className="w-full"> 
                    <span className="">Filter by:</span>
                </div>
                <div className="grid grid-cols-3 w-full gap-5 ">
                    <TutorSearchCard></TutorSearchCard>
                    <TutorSearchCard></TutorSearchCard>
                </div>
            </div>
    );
}

export default TutorsSearch;