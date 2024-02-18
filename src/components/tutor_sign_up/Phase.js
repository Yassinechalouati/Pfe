import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const Phase = ({label}) => {
    return (
        <div className="flex justify-center items-center space-x-1 bg-white w-[25%] border">
            <FaRegCircle color='gray' size="17"/>
            <span className="text-sm ">{label}</span>
        </div>
    );
};

export default Phase;