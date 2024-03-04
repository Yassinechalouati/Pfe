import Body from "../../../components/learner profile/Body";
import NavBar from "../../../components/learner profile/NavBar";

function LearnerProfile() {
    return (
        <div className="w-screen h-screen bg-backg flex flex-col">
            <NavBar></NavBar>
            <Body></Body>
        </div>
    );
}

export default LearnerProfile;