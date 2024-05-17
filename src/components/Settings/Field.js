import { MdEdit } from "react-icons/md";
import { useState } from "react";

function Field(props) {
    const [editing, setEditing] = useState(false)
    const handleClick = () => {
        setEditing(prevValue=> !prevValue)
    }
    return (
        <div onClick={handleClick} className="border-b px-2 hover:bg-lightg cursor-pointer justify-between items-center flex border-lightg py-2">
            <span className="text-black font-bold">
                First Name
            </span>
            {
                !editing?
                <>
                    <span className=""> {props.field}</span>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <>
                    <div className="flex items-center w-[50%] space-x-3 ">
                        <input
                            minLength="3"
                            maxLength="30"
                            className="shadow  text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                            type="text"
                            required
                            placeholder="First Name"
                            
                        />
                        <div className="px-4 py-2 rounded-md bg-button2 text-white"> Save</div>
                    </div>
                </> 

            }
        </div>
    );
}

export default Field;