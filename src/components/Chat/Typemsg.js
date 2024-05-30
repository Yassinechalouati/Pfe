import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import { appendMessage } from "../../state/slices/chatSlice";
export default function Voicemsg() {
  const dispatch = useDispatch()
  const param = useParams()
  const [text, setText] = useState("")
  const path = window.location.pathname;
  const learnerData  = useSelector(state => state.userData)
  const tutorData = useSelector(state => state.tutorData)
  // Split the path by "/"
  const segments = path.split('/');


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
    const response = await axiosInstance.post(`http://localhost:5000/${segments[1]}/saveMessages`, {
    id: param.uuid,
    msg: text
    })
    console.log(response.data)
    const TextId = response.data.messageUuid
    const friendUuid = param.uuid
    const Sender = segments[1] ==="learner"? "Learner" : "Tutor" 
    console.log("friends IDIDID", friendUuid)
    const message = text
    //generating current date object
    const currentDate = new Date();

    // Extract individual components of the date and time
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const MessageTime= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` 
    const myId = segments[1] === "learner" ? learnerData.id : tutorData.id
    const data = {
      TextId: TextId,
      friendUuid: friendUuid,
      Sender: Sender,
      message: message,
      MessageTime: MessageTime,
      myId: myId,
      pfp: response.data.pfp,
      lastname: segments[1] === "learner" ? learnerData.lastname : tutorData.lastname, 
      firstname: segments[1] === "learner" ? learnerData.firstname : tutorData.firstname
    } 
    const socket = io('http://localhost:5000/', {
            auth: {
                token: localStorage.getItem('accesstoken')
            }
            });
            dispatch(appendMessage(
              {TextID : TextId, 
                id: response.data.id,
                IdLearner: segments[1]==="learner"? myId: response.data.id,
                IdTutor: segments[1]==="Tutor"? myId: response.data.id,
                message: message,
                MessageTime: MessageTime,
                Sender: Sender,
                pfp: response.data.pfp,
                lastname: segments[1] === "learner" ? learnerData.lastname : tutorData.lastname, 
                firstname: segments[1] === "learner" ? learnerData.firstname : tutorData.firstname
              }
              ))
    socket.emit('send_message', data)
      setText("")
    } catch (error) {
      console.log("this is an error", error)  
    }
  }
  const handleChange = (event) =>{
    console.log(event.target.value)
    setText (event.target.value)
  }
return (

<form 
onSubmit={handleSubmit}
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
          >
            <div>
              <button
                className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input onChange ={handleChange}
                  value ={text}
                  placeholder="Type..."
                  type="text"
                  className=" flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-button2 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" 
                type= "submit" 
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </form>
          )}