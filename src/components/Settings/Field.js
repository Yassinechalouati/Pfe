import { MdEdit } from "react-icons/md";
import { useState } from "react";
import PhoneNumberInput from "./PhoneNumberInput";

function Field(props) {
    const [editing, setEditing] = useState(false)
    const handleClick = () => {
        if(!editing ){
            setEditing(true)
        }
    }
    const handleSave = () => {
        if(editing) {
            setEditing(false)
        }
    }

    const handleInput =() => {
        if(props.title ==="Mobile Number") {
            return <PhoneNumberInput></PhoneNumberInput>
        }else if(props.title === "Password") {
            return <input
            className="text-sm appearance-none border border-darkg rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
            type="password"
            minLength="8"
            maxLength="30"
            pattern="^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$" // assuring the password contains at least one uppercase letter and one digit
            //title={`${tutorData?.password.length<8? `Contains at least 8 characters (currently at ${tutorData.password.length} characters), `:""}Contains at least an UpperCase letter and a digit`}
            placeholder= {props.title}
            />
        }else {
            return <input
            minLength="3"
            maxLength="30"
            className="text-sm appearance-none border border-darkg rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
            type="text"
            required
            placeholder={props.title}
            />
        }
                            
    }
    return (
        <div onClick={handleClick} className="border-b px-2 hover:bg-lightg cursor-pointer justify-between items-center flex border-lightg py-2">
            <span className="text-black font-bold">
                {props.title}
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
                        {
                            handleInput()
                            
                        }
                        <div onClick={handleSave} className="px-4 py-2 rounded-md bg-elements text-white"> Save</div>
                    </div>
                </> 
            }
        </div>
    );
}

export default Field;