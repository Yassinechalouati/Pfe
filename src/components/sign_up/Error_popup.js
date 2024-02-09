import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import { setError } from "../../state/slices/errorSlice";

export default function Errorpop({error}) {
    //controlling the visibility or the error popup
    const [isVisible, setIsVisible] = useState(false);

    //animation duration 
    const duration = "400"

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    useEffect(() => {
        // Show error message if error exists
        setIsVisible(!!error);
        
        //remove the popup after a duration of time
        const timeoutId = setTimeout(() => {
            setIsVisible(false)
            // after the popup is removed reset the error value 
            setTimeout(() => {
                dispatch(setError(""))
            }, parseInt(duration, 10)+100)
        }, 2500)

        // Clear the timeout on component unmount to avoid memory leaks
        return () => clearTimeout(timeoutId);
    }, [error, dispatch]);

    return(
        <div
            className={`fixed bottom-0 flex border-errortext border-[1px] justify-center items-center left-1/2 transform -translate-x-1/2 bg-errorbg text-white p-3 text-center w-auto rounded-xl text-sm transition-transform duration-${duration} ${
                isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <span className="text-errortext text-sm font-bold w-full h-full">Error: {error}</span>
       </div> 
    )
}   