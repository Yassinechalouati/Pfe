
import FocusTopics from "./FocusTopics";
import LearningGoals from "./LearningGoals";
import Proficiency from "./Proficiency";
import Title from "./Title";
import Country from "./Country";
import axiosInstance from "../../interceptors/axiosInterceptor";


function ProfileChange(props) {
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const modifyCall = async (value, type) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post('http://localhost:5000/learner/Update', {
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


    return (
        <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <Title role={firstSegment} title={firstSegment==="learner"? "Student Profile" : "Tutor Profile"}></Title>
            <Proficiency modifyCall={modifyCall} title="Language Proficiency"></Proficiency>
            <LearningGoals modifyCall={modifyCall} title="Learning Goals"></LearningGoals>
            <FocusTopics modifyCall={modifyCall} title="Focus Topics"></FocusTopics>
            <Country modifyCall={modifyCall} title="From" role={firstSegment}></Country>
        </div>
    );
}

export default ProfileChange;