import ProfileField from "./ProfileField";


function Education(props) {
    return (
        <ProfileField placeholder={props.placeholder} icon={props.icon} title={props.title}></ProfileField>
    );
}

export default Education;