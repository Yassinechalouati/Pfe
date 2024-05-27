import { useEffect, useState } from "react";
import { CourseLoading} from "../../../components/Global/LoadingCards";
import Course from "../../../components/LearnerCourses/Course";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { setListOfCourses } from "../../../state/slices/CourseSlice";
import { fetchFile } from "../../../components/Global/functions";


function CoursesSearch() {
    const Category = [
        "All",
        "Business Language Skills",
        "Information Technology Language Skills",
        "Healthcare Language Skills",
        "Legal Language Skills",
        "Engineering Language Skills",
        "Customer Service Language Skills",
        "Academic Language Skills",
        "Hospitality and Tourism Language Skills",
        "Financial Language Skills",
        "Marketing and Sales Language Skills",
    ]
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    const dispatch = useDispatch()
    

    const AllCoursesList = useSelector(state => state.courseData.listOfCourses)

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.post('http://localhost:5000/learner/getAllCourses')
                console.log("myCourses: ", response.data);
                if(response.data.result.length ===0) {
                    setIsEmpty(true)
                }else {
                    dispatch(setListOfCourses(response.data.result))
                }
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchMyCourses() 
    }, [])
    

    useEffect(() => {
        if(AllCoursesList) {
            setList(AllCoursesList)
        }
    }, [AllCoursesList])

    const handleSelectedCategory = (Category) => {
        setSelectedCategory(Category)
        if(Category === "All") {
            setList(AllCoursesList)
        }else {
            const filteredArray = AllCoursesList.filter((item) => item.Category === Category)
            setList(filteredArray)
        }
    }



    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-16 py-7 gap-5">
            <div className="flex flex-col w-auto justify-start items-start space-y-1 border-r-[1px] border-darkg">
                {
                    Category.map((item, index) => {
                        return <span 
                        key={index} 
                        onClick={()=> handleSelectedCategory(item)}
                        className={`cursor-pointer min-h-10 py-2 ${selectedCategory === item? "border-b-button font-bold text-button border-b-2": "text-black"}`}>
                            {item}
                        </span>
                    })
                }
            </div>
            
            <div className="w-full grid col-span-2 md:grid-cols-3 grid-cols-1 gap-4">
                    {
                            loading? 
                            <>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                            </>
                            :
                            (!isEmpty? 
                                list.map((course, index) => {
                                    return <>
                                        <Course key={index} course={course}></Course>
                                    </> 
                                })
                                :
                                null
                            )
                    }
                </div>
                
                {
                    isEmpty?
                        <img 
                        alt="empty" 
                        src="/no-data.png" 
                        className="w-72 h-72 flex justify-center items-center object-cover"></img>
                    :
                    null
                }
        </div>
    )
};

export default CoursesSearch;