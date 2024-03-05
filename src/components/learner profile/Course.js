import {MdOutlineNavigateNext} from 'react-icons/md'
function Course() {
    return (
        <div className="flex flex-col space-y-6 w-[30%] pb-3 rounded-3xl border hover:bg-lightg ">
            <img src="/teach.jpg" alt="tutorvideo" className="w-full h-36 object-cover rounded-t-3xl"></img> 
            <div className="flex flex-col space-y-3 px-5 w-full cursor-pointer">
                <div className="self-start">
                    <span className="text-xs p-[5px] rounded-full text-white bg-button2">Advanced</span>
                </div>
                <span className="font-bold">Advanced Business English Communication</span>
                <span className="text-sm">Advanced communication skills for high stakes business situations.</span>
                <button className="flex space-x-1 rounded-full font-bold p-2 bg-lightbutton border border-button text-button items-center justify-center mt-2">
                    <span className="text-sm">Continue</span>
                    <MdOutlineNavigateNext size="22" color="#FFA447"></MdOutlineNavigateNext>
                </button>
            </div>
        </div>
    );
}

export default Course;