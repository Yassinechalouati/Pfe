import ProfileField from "./ProfileField";

function WorkExperience(props) {
    return (
        <ProfileField icon={props.icon} placeholder={props.placeholder} title={props.title}></ProfileField>
    );
}

export default WorkExperience;