import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";


function BirthdayField(props) {
    const [editing, setEditing] = useState(false)
    

    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');

    
    
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

    // defininig the min and max values from the date, it should not be less than 150 years from now
    //and it should not be more than today
    useEffect(() => {
        const today = new Date();
        const maxDate = today.toISOString().split('T')[0];
        
        const minDate = new Date(today.setFullYear(today.getFullYear() - 150)).toISOString().split('T')[0];
        
        setMaxDate(maxDate);
        setMinDate(minDate);
    }, []);
    

    return (
        <div onClick={handleClick} className="border-b px-2 hover:bg-lightg cursor-pointer justify-between items-center flex border-lightg py-2">
            <span className="text-black font-bold">
                Birthday
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
                            className=" cursor-text text-sm appearance-none border border-darkg rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                            type="date"
                            required
                            max={maxDate}
                            min={minDate}
                            
                        />
                        <div  onClick={handleSave}  className="px-4 py-2 rounded-md bg-elements text-white"> Save</div>
                    </div>
                </> 
            }
        </div>
    );
}

export default BirthdayField;