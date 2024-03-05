
import {MdOutlineNavigateNext} from 'react-icons/md'
function Tutor(props) {
    return (
        <div className="flex flex-col space-y-6 w-[30%] pb-3 rounded-3xl border hover:bg-lightg ">
            <img src="/teach.jpg" alt="tutorvideo" className="w-full h-36 object-cover rounded-t-3xl"></img> 
            <div className="flex flex-col px-5 w-full cursor-pointer">
                <div className="flex justify-between items-center w-full">
                    <span className="font-bold">Tutor</span>
                    <img src="/teach.jpg" alt="tutorpfp" className="w-9 h-9 object-cover rounded-full"></img>
                </div>
                <span className="text-sm">Accent</span>
                <span className="text-sm">Tutor since 2019</span>
                <button className="flex space-x-1 rounded-full font-bold p-2 bg-lightbutton border border-button text-button items-center justify-center mt-2">
                    <span className="text-sm">See profile</span>
                    <MdOutlineNavigateNext size="22" color="#FFA447"></MdOutlineNavigateNext>
                </button>
            </div>
        </div>
    );
}

export default Tutor;