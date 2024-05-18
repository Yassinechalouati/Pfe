
import FocusTopics from "./FocusTopics";
import LearningGoals from "./LearningGoals";
import Proficiency from "./Proficiency";
import Title from "./Title";
import Country from "./Country";

function ProfileChange(props) {
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 


    return (
        <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <Title role={firstSegment} title={firstSegment==="learner"? "Student Profile" : "Tutor Profile"}></Title>
            <Proficiency title="Language Proficiency"></Proficiency>
            <LearningGoals title="Learning Goals"></LearningGoals>
            <FocusTopics title="Focus Topics"></FocusTopics>
            <Country title="From" role={firstSegment}></Country>
        </div>
    );
}

export default ProfileChange;