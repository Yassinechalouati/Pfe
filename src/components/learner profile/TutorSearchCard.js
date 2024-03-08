import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { useState } from 'react'


function TutorSearchCard() {

    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked(prevValue => !prevValue)
    }

    return (
        <div className="cursor-pointer rounded-2xl flex flex-col space-y-3 shadow-2xl px-5 py-2 bg-backg border-darkg border" >
            <div className="flex w-full items-center space-x-3 relative">
                <img src="/teach.jpg" alt="prolfiepicture" className="rounded-3xl w-24 h-24 object-cover"></img>
                <div className="flex flex-col h-full">
                    <span className="text-lg">Yassine</span>
                    <span className="text-darkg">USA Accent</span>
                </div>
                <div onClick={handleLike} className="rounded-full absolute top-0 right-0 flex p-1 hover:bg-lightg justify-center items-center">
                    {
                        liked?
                        <IoIosHeart size="22" color="red"></IoIosHeart>
                        :
                        <IoIosHeartEmpty size="22" color=""></IoIosHeartEmpty>
                    }
                </div>
            </div>
            <hr key="1" className="h-1 w-full"></hr>
            <span className="text-darkg text-sm w-full h-full break-all">{}</span>
        </div>
    );
}

export default TutorSearchCard;