import React, { useEffect, useState } from "react";
import { fetchFile, isGoogleProfilePicture } from "../Global/functions";

const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

const Receivemsg = (props) => {

  const [imgUrl, setImgUrl] = useState(null) 
  useEffect(() => {
    const fetchData = async() => {
            try {
              let imageUrl = props.msg.pfp
                    if(imageUrl) {
                        if (!isGoogleProfilePicture(imageUrl)) {
                            imageUrl = await fetchFile(props.msg.pfp, 'images',segments[1]==="learner"? "Tutor" : "Learner" , segments[1]==="learner"?  props.msg.IdTutor: props.msg.IdLearner);
                        }
                        setImgUrl(imageUrl)
                    }
            } catch (error){
              console.log("HEREEEE", error)
            }
    } 
    fetchData() 
    
    })

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <img className=" h-10 w-10 rounded-full object-cover" src={imgUrl} alt="friendsImage">
        </img>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{props.msg.message} </div>
        </div>
      </div>
    </div>
  );
};

export default Receivemsg;
