import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { useEffect, useState } from 'react'
import { fetchCountryData, fetchFile } from "../Global/functions";


function TutorSearchCard(props) {

    //controlling wether the user liked this tutor or not
    const [liked, setLiked] = useState(false)

    //tutor profile picture
    const [imageData, setImageData] = useState()

    //flag image of the tutor's country
    const [countryData, setCountryData] = useState(null);


    const handleLike = () => {
        setLiked(prevValue => !prevValue)
    }


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



    return (
        <div className="cursor-pointer min-h-72 max-h-72 rounded-2xl flex flex-col space-y-3 shadow-lg px-5 py-2 bg-white border-darkg border" >
            <div className="flex w-full items-center space-x-3">
                <img src={imageData} alt="prolfiepicture" className="rounded-3xl min-w-24 max-w-24 h-24 object-cover"></img>
                <div className="flex flex-col space-y-2 w-full h-full truncate">
                    <span className="text-lg">
                        {props.tutor.firstname && props.tutor.lastname ? props.tutor.firstname + " " + props.tutor.lastname : props.tutor.email}
                    </span>
                    <div className="flex space-x-2 items-center">
                        {countryData && countryData[0]?.flags && (
                            <img className="rounded-lg w-9 h-9 object-cover" src={countryData[0].flags.png} alt={props.tutor.Country} />
                        )}
                        <span className="text-darkg">{props.tutor.Country}</span>
                    </div>                
                </div>
                <div onClick={handleLike} className="rounded-full self-start flex p-1 hover:bg-lightg justify-center items-center">
                    {
                        liked?
                        <IoIosHeart size="22" color="red"></IoIosHeart>
                        :
                        <IoIosHeartEmpty size="22" color=""></IoIosHeartEmpty>
                    }
                </div>
            </div>
            <hr key="1" className="h-1 w-full"></hr>
            <div className="flex flex-col w-full h-full overflow-y-auto break-before-avoid scrollbar-hidden"  style={{ scrollbarWidth: 'none',}}>
                <span className="font-bold ">
                    Introduction:
                </span>
                <span className="text-darkg w-full h-full text-sm">{props.tutor.description}</span>
            </div>
            <div className="flex space-x-3 self-end">
                    <button
                    className={`bg-button2 border border-button2 flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-white hover:shadow`}>
                    Text</button>
                    <button 
                    className={`bg-backg  border border-button2 flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-button2 hover:shadow`}>
                    Profile</button>
            </div>
        </div>
    );
}

export default TutorSearchCard;