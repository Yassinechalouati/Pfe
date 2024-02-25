

function ProfileField(props) {
    return (
        <div className="w-[80%] md:w-[50%] h-[30%] flex-col m-auto flex space-y-2 p-[13px] shadow bg-lightg rounded-xl">
            <div className="w-full h-[15%] flex items-center space-x-2 ">
                {props.icon}
                <span className="text-black font-bold h-full text-sm">{props.title}</span>
            </div>
            <div className="relative h-[85%] w-full shadow rounded-xl">
                <textarea className="w-full resize-none outline-none h-full rounded-xl p-2 text-sm" placeholder={props.placeholder}></textarea>
            </div>
        </div>
    );
}

export default ProfileField;