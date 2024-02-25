

function Education(props) {
    return (
        <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
                {
                    //<Modal content={content} title={props.title} icon={<MdLanguage size="22" color="#FFA447"></MdLanguage>}></Modal>
                }
            <div className="w-full h-[15%] flex items-center space-x-2 ">
                {props.icon}
                <span className="text-black font-bold h-full text-sm">{props.title}</span>
            </div>
            <span className="text-darkg h-full text-sm">{props.placeholder}</span>
            <button className=" bg-button2 text-sm text-white w-36 h-10 rounded-lg">
                    ADD EDUCATION
            </button>
        </div>
    );
}

export default Education;