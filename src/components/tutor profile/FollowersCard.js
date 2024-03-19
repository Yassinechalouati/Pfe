import Card from "../learner profile/Card";
import { BiSolidHeartCircle } from "react-icons/bi";
import { RiUserFollowFill } from "react-icons/ri";
import { RiChat1Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";


function InformationalCard(props) {
    //contains the content of this card
    const content = [
            <div key="followers" className="flex justify-between w-full ">
                <div className="flex items-center space-x-2">
                    <RiUserFollowFill className="text-elements" size="25"></RiUserFollowFill>
                    <span className="font-bold">Followers</span>
                </div>
                <span>50</span>
            </div>,
            <hr key="line1" className="w-full h-1"></hr>,
            <div key="Likes" className="flex justify-between w-full ">
                <div className="flex items-center space-x-2">
                    <BiSolidHeartCircle className="text-red-500" size="25"></BiSolidHeartCircle>
                    <span className="font-bold">Likes</span>
                </div>
                <span>50</span>
            </div>,
            <hr key="line2" className="w-full h-1"></hr>,
            <div key="Chat" className="flex justify-between w-full ">
                <div className="flex items-center space-x-2">
                    <RiChat1Fill className="text-elements" size="25"></RiChat1Fill>
                    <span className="font-bold">Chats</span>
                </div>
                <span>50</span>
            </div>,
            <hr key="line3" className="w-full h-1"></hr>,
            <div key="stars" className="flex justify-between w-full ">
                <div className="flex items-center space-x-2">
                    <FaStar className="text-star" size="25"></FaStar>
                    <span className="font-bold">Ratings</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FaStar className="text-star" size="19"></FaStar>
                    <FaStar className="text-star" size="19"></FaStar>
                    <FaStar className="text-star" size="19"></FaStar>
                    <FaStar className="text-star" size="19"></FaStar>
                    <FaRegStar className="text-darkg" size="19"></FaRegStar>
                </div>
            </div>
    ]


    return (
        <Card content={content}></Card>
    );
}

export default InformationalCard;