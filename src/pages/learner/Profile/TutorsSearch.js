import { useEffect, useState } from "react";
import TutorSearchCard from "../../../components/learner profile/TutorSearchCard";
import { setMaxPageNumber, setTutorSearchList } from "../../../state/slices/userSlice";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../../components/Global/Loading'
import ShowMoreTutors from "../../../components/learner profile/ShowMoreTutors";


function TutorsSearch(props) {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const learnerData = useSelector(state => state.userData)

    const maxPageNumber = useSelector(state => state.userData.maxPageNumber)

    async function fetchData () {
        try {
                setLoading(true)
                const response = await axiosInstance.post('http://localhost:5000/SearchTutors', {
                    page: 1,
                    pageSize: 3
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                });
                dispatch(setTutorSearchList(response.data.tutorsList))
                dispatch(setMaxPageNumber(response.data.tutorsNumber))
                setLoading(false)
            }catch(err) {
                console.log(err)
                setLoading(false)
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
                    <span className="cursor-pointer">Online</span>
                    <span className="cursor-pointer">Favorites</span>
                </div>
                <input
                type="search"
                placeholder="Search for tutor..."
                className="w-full mb-5 px-4 py-2 border rounded-xl focus:outline-none focus:border-elements transition-colors duration-300"
                />
                <div className="w-full"> 
                    <span className="">Filter by:</span>
                </div>
                {
                    loading? 
                    <Loading></Loading>
                    :
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5 ">
                            {
                                learnerData.tutorSearchList.map((tutor, index) => {
                                    return <TutorSearchCard key={index} tutor={tutor}></TutorSearchCard>
                                })
                            }
                        </div>
                        {
                            maxPageNumber !== learnerData.tutorSearchList.length?
                            <ShowMoreTutors></ShowMoreTutors>
                            :
                            null

                        }
                    </>

                }
            </div>
    );
}

export default TutorsSearch;