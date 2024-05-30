import React, { useEffect, useRef } from "react";
import Receivemsg from "./Receivemsg";
import Sendmsg from "./Sendmsg";
import Voicemsg from "./Voicemsg";
import Typemsg from "./Typemsg";
import { useParams } from "react-router-dom";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { setConvo } from "../../state/slices/chatSlice";
export default function Rightside() {
  const learnerData = useSelector(state => state.userData)
  const tutorData = useSelector(state => state.tutorData)
  const dispatch = useDispatch()

  const path = window.location.pathname;

  // Split the path by "/"
  const segments = path.split('/');

  const convo =  useSelector(state => state.chatData.convo)

  const chatContainerRef = useRef(null);
  

  //getting the uuid from the url
  const param = useParams()

  useEffect(() => {
    // Scroll to the bottom whenever convo changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [convo]);

useEffect(() => {
  const fetchConvo = async() => {

    try {
      const response = await axiosInstance.post(`http://localhost:5000/${segments[1]}/getMessages`, {
      uuid: param.uuid
    })
    console.log("RESULT", response.data)
    dispatch(setConvo(response.data))
    console.log("this is a response about convo", response)
    } catch (error) {
      console.log(error)
    }
  }
  fetchConvo()
}, [])


return (
<div className="flex flex-col flex-auto h-full p-6">
        <div
          className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
          <div className="flex flex-col h-full overflow-x-auto mb-4" ref={chatContainerRef}>
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {
                  convo.map((msg, index ) => {
                    console.log("condition:  ", segments)
                    if ( msg.Sender.toLowerCase() === segments[1].toLowerCase() ) {
                      return <Sendmsg key={index} img= {segments[1]==="learner"? (learnerData.pic==="user.png" ? "/" +learnerData.pic: learnerData.pic ) : (tutorData.displayableImage)} msg={msg} ></Sendmsg>
                    }
                    else{
                      return <Receivemsg key={index} msg={msg} ></Receivemsg>
                    }
                  })
                }
                

              </div>
            </div>
          </div>
                <Typemsg></Typemsg>
        </div>
      </div>
)
}