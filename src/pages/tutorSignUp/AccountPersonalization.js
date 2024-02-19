import StepBar from "../../components/tutor_sign_up/StepBar"
import FirstPhase from "../../components/tutor_sign_up/FirstPhase";
import SecondPhase from "../../components/tutor_sign_up/SecondPhase";



function AccountPersonalization() {
    return (
        <form className="h-screen w-screen flex flex-col bg-backg">
            <StepBar></StepBar>
            <SecondPhase></SecondPhase>
        </form>
    );
}

export default AccountPersonalization;