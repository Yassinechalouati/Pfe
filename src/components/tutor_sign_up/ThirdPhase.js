import { FaChalkboardTeacher } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdLanguage } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import AboutMe from './AboutMe'
import Languages from './Languages'
import WorkExperience from './WorkExperience'
import Education from './Education'
import TeachingStyle from './TeachingStyle'


function ThirdPhase() {
    const element = [
        {
           icon: <FaChalkboardTeacher color="#767676" size="17"></FaChalkboardTeacher>,
           placeholder: 'Give students a glimpse into what to expect from your class...',
           title: 'Teaching Style'
        },
        {
           icon: <FcAbout color="#767676" size="17"></FcAbout>,
           placeholder: 'Feel free to share more about yourself here. Adding details about your hobbies, interests, and travel experiences can help connect with students who share similar interests...',
           title: 'About Me'
        },
        {
           icon: <MdLanguage color="#767676" size="17"></MdLanguage>,
           placeholder: 'Kindly indicate languages you speak.',
           title: 'Languages'
        },
        {
           icon: <MdWork color="#767676" size="17"></MdWork>,
           placeholder: '',
           title: 'Work Experience'
        },
        {
           icon: <RiGraduationCapFill color="#767676" size="17"></RiGraduationCapFill>,
           placeholder: '',
           title: 'Education'
        },
    ]
    return (
        <div className="w-full h-[80%] space-y-2 py-3 overflow-y-auto"> 
            <TeachingStyle {...element[0]} ></TeachingStyle>
            <AboutMe {...element[1]}></AboutMe>
            <Languages {...element[2]}></Languages>
            <WorkExperience {...element[3]}></WorkExperience>
            <Education {...element[4]}></Education>
        </div>
    );
}

export default ThirdPhase;