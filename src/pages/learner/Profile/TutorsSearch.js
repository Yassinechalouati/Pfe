import { useEffect, useState } from "react";
import TutorSearchCard from "../../../components/learner profile/TutorSearchCard";
import { resetFilterOptions, setMaxPageNumber, setTutorSearchList } from "../../../state/slices/userSlice";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../../components/Global/Loading'
import ShowMoreTutors from "../../../components/learner profile/ShowMoreTutors";
import SearchTutors from "../../../components/learner profile/SearchTutors";
import LanguageSelection from "../../../components/learner profile/TutorFilterOption/LanguageSelection";
import Availability from '../../../components/learner profile/TutorFilterOption/Availability'
import Proficiency from "../../../components/learner profile/TutorFilterOption/Proficiency";




function TutorsSearch(props) {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const learnerData = useSelector(state => state.userData)

    const filterOptions = useSelector(state => state.userData.filterOptions)

    const maxPageNumber = useSelector(state => state.userData.maxPageNumber)


    //getting tutors from the database
    async function fetchData (filterOption) {
        try {
                setLoading(true)
                const response = await axiosInstance.post('http://localhost:5000/SearchTutors', {
                    page: 1,
                    pageSize: 3,
                    filterOptions: filterOption
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                });
                if(!response.data.message) { // no error 
                    console.log(response.data);
                    dispatch(setTutorSearchList(response.data.tutorsList))
                    dispatch(setMaxPageNumber(response.data.tutorsNumber))
                }
                setLoading(false)
            }catch(err) {
                console.log(err)
                setLoading(false)
            }
    }

    //reset the fields and get all the data again 
    const handleReset = () => {
        dispatch(resetFilterOptions())
        fetchData({
            name:"",
            language:"",
            proficiency: "",
            availability: ""
        })
    }

    useEffect(() => {
        fetchData(filterOptions)
    }, [])


    return (
            <div className="flex flex-col space-y-4 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7">
                <div className="flex w-full items-center space-x-8 ">
                    <span className="font-bold text-2xl text-center"> Find a Tutor</span>
                    <span className="cursor-pointer">All</span>
                    <span className="cursor-pointer">Favorites</span>
                </div>
                <SearchTutors fetchData={fetchData}></SearchTutors>
                <Proficiency fetchData={fetchData}></Proficiency>
                <hr className="h-1"></hr>
                <div className="w-full flex items-center space-x-3 h-auto flex-wrap"> 
                    <span className="">Filter by:</span>
                    <Availability fetchData={fetchData}></Availability>
                    <LanguageSelection fetchData={fetchData}></LanguageSelection>
                    <div className="flex-grow hidden lg:block"></div>
                    {
                        filterOptions.language || filterOptions.proficiency || filterOptions.availability?
                            <div onClick={handleReset} className=" transition-all duration-200 py-[6px] px-9 rounded-lg cursor-pointer button bg-darkg text-white">Clear</div>
                        :
                            null
                    }
                </div>
                {
                    loading? 
                    <Loading></Loading>
                    :
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5 ">
                            {
                                learnerData.tutorSearchList? 
                                learnerData.tutorSearchList.map((tutor, index) => {
                                    return <TutorSearchCard key={index} tutor={tutor}></TutorSearchCard>
                                })
                                :
                                null
                            }
                        </div>
                        {
                            learnerData.tutorSearchList && (maxPageNumber !== learnerData.tutorSearchList.length)?
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