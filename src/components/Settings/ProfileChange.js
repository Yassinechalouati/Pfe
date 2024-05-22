
import FocusTopics from "./FocusTopics";
import LearningGoals from "./LearningGoals";
import Proficiency from "./Proficiency";
import Title from "./Title";
import Country from "./Country";
import axiosInstance from "../../interceptors/axiosInterceptor";
import Languages from "./Languages";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import Description from "./Description";
import TeachingStyle from "./TeachingStyle";
import AboutMe from "./AboutMe";
import WorkExperience from "./WorkExperience";
import Education from "./Education";

function ProfileChange(props) {

    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const modifyCall = async (value, type) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(`http://localhost:5000/${firstSegment}/Update`, {
                type: type,
                newParameter: value
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            .then((response) => {
                
                console.log(response.data.message);

                resolve('updated')
            })
            .catch((err) => {
                reject('error')
                console.log(err);
            })
        })
    }

    //list of tags
   const Tags = [
    'Education',
    'It',
    'Advertising',
    'Agriculture',
    'Entrepreneurship',
    'Government',
    'Law',
    'Customer Support',
]

  
 //icons and placeholders and titles for the fields
 const element = [
    {
       icon: <FaChalkboardTeacher className="text-darkg" size="20"></FaChalkboardTeacher>,
       placeholder: 'Give students a glimpse into what to expect from your class...',
       title: 'Teaching Style'
    },
    {
       icon: <IoIosInformationCircle
       className="text-darkg"
       size="20" 
       ></IoIosInformationCircle>,
       placeholder: 'Feel free to share more about yourself here. Adding details about your hobbies, interests, and travel experiences can help connect with students who share similar interests...',
       title: 'About Me'
    },
    {
       icon: <MdLanguage className="text-darkg" size="20"></MdLanguage>,
       placeholder: 'Kindly indicate languages you speak.',
       title: 'Languages'
    },
    {
       icon: <MdWork className="text-darkg" size="20"></MdWork>,
       placeholder: '',
       title: 'Work Experience'
    },
    {
       icon: <RiGraduationCapFill className="text-darkg" size="20"></RiGraduationCapFill>,
       placeholder: '',
       title: 'Education'
    },
 ]



 

    return (
        <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <Title role={firstSegment} title={firstSegment==="learner"? "Student Profile" : "Tutor Profile"}></Title>
            {
                firstSegment === "learner" ?
                <>
                    <Proficiency modifyCall={modifyCall} title="Language Proficiency"></Proficiency>
                    <LearningGoals modifyCall={modifyCall} title="Learning Goals"></LearningGoals>
                    <FocusTopics modifyCall={modifyCall} title="Focus Topics"></FocusTopics>
                    <Country modifyCall={modifyCall} title="From" role={firstSegment}></Country>
                </>
                :
                <>
                    <Languages modifyCall={modifyCall} title="Languages"></Languages>
                    <WorkExperience title="Work Experience" modifyCall={modifyCall}></WorkExperience>
                    <Education title="Education" modifyCall={modifyCall}></Education>
                    <Description modifyCall={modifyCall} title ="Description"></Description>
                    <TeachingStyle modifyCall={modifyCall} title="Teaching Style"></TeachingStyle>
                    <AboutMe modifyCall={modifyCall} title="About Me"></AboutMe>
                </>
            }
        </div>
    );
}

export default ProfileChange;