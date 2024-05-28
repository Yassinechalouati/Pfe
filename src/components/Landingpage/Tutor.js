import { useEffect, useState } from "react"
import { fetchCountryData, fetchFile} from "../Global/functions"
import VideoPlaceholder from "../Global/VideoPlaceholder"
import { BiSolidHeartCircle } from "react-icons/bi";



function Tutor(props) {

    const [videoUrl, setVideoUrl] = useState(null)
    const [countryData, setCountryData] = useState(null)

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                let vidUrl = props.tutor.introductionVideo
                if(vidUrl) {
                    vidUrl = await fetchFile(vidUrl, "videos", "tutor", props.tutor.id);
                }
                setVideoUrl(vidUrl)
                const data = await fetchCountryData(props.tutor.Country)
                setCountryData(data)

            } catch (error) {
                console.log("error: ", error);
            }
        }

        fetchData()

    }, [])

    const handleTimeFormat = () => {
        const createdAt = new Date(props.tutor.created_at)
        const year = createdAt.getFullYear()
        console.log("year:", year);
        return `Tutor since ${year}`
    }

    


    return (
        <div key={props.key} className="bg-white w-72 p-4 rounded-lg shadow-md flex flex-col space-y-2">
            {
                videoUrl?
                <VideoPlaceholder videoUrl={videoUrl}></VideoPlaceholder>
                :
                null
            }
            <div className="flex items-center justify-between">
                <div className="text-black font-bold">
                    {props.tutor.firstname+" "+ props.tutor.lastname} 
                </div>
                <div className="flex space-x-2 items-center ">
                    {countryData && countryData[0]?.flags && (
                        <img className="rounded-full max-h-6 max-w-6 min-w-6 min-h-6 object-cover" src={countryData[0].flags.png} alt={props.tutor.Country} />
                    )}
                    <span className="text-darkg">{props.tutor.Country}</span>
                </div>  
            </div>
            <div key="Likes" className="flex justify-between w-full ">
                <span className="font-bold">Likes</span>
                <div className="flex items-center space-x-1">
                    <BiSolidHeartCircle className="text-button2" size="25"></BiSolidHeartCircle>
                    <span>{props.tutor.like_count}</span>
                </div>
            </div>
            <div className="text-black text-sm">{handleTimeFormat()}</div>
      </div>
    );
}

export default Tutor;