
import { useState, useEffect } from "react";
import { fetchCountryData } from "../../Global/functions";
import { fetchFile } from "../../Global/functions";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTutor, setSteps } from "../../../state/slices/Schedule";

function TutorRow(props) {
    const dispatch = useDispatch()
    const step = useSelector(state => state.scheduleData.step)

    //tutor profile picture
    const [imageData, setImageData] = useState()

    //flag image of the tutor's country
    const [countryData, setCountryData] = useState(null);

    //fetching tutor profile picture from backend
    async function fetchData () {
        if(props.tutor.pfp && props.tutor.id){
            fetchFile(props.tutor.pfp, "images", "Tutor", props.tutor.id)
            .then(response => {
                setImageData(response)
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    
      const fetchFlag = async () => {
        const data = await fetchCountryData(props.tutor.Country);
        setCountryData(data);
      };

    useEffect(() => {
        //getting tutor picture
        fetchData()
        //getting the flag of the tutor's country
        fetchFlag()
    }, [])

    const handleNavigateForward =  () => {
        console.log(props.tutor.id)
        dispatch(setSelectedTutor(props.tutor.id))
        dispatch(setSteps(step+1))
    }

    return (
        <div onClick={handleNavigateForward} className="flex cursor-pointer hover:bg-lightg rounded-md p-2 w-full items-center space-x-2">
            <img src={imageData} alt="tutorprofilepicture" className=" min-w-20 h-20 object-cover rounded-full"></img>
            <div className="flex truncate flex-col justify-center">
                <span className="text-black">{props.tutor.firstname && props.tutor.lastname ? props.tutor.firstname + " " + props.tutor.lastname : props.tutor.email}</span>
                <div className="flex space-x-2 items-center">
                    {countryData && countryData[0]?.flags && (
                        <img className="rounded-lg w-4 h-4 object-cover" src={countryData[0].flags.png} alt={props.tutor.Country} />
                    )}
                    <span className=" ml-4 text-sm text-darkg">{props.tutor.Country}</span>
                </div>
                <span className="text-darkg mt-2 text-sm">{props.tutor.description}</span>
            </div>
        </div>
    );
}

export default TutorRow;