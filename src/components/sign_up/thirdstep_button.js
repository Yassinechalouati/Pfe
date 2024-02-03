import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setGoals, setTopics} from '../../state/userSlice';

export default function Buttn({text, type}) {
    //color changer
    const [color, setColor] = useState("bg-[#f0f0f0]")

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()
    
    //getting the goals from the store 
    const goals = useSelector((state) => state.userData.goals)
    
    //getting the topics from the store
    const topics = useSelector((state) => state.userData.topics)

    //alternating between colors when clicking buttons 
    const handleClick = () => {
        setColor( prevValue => prevValue ==="bg-button"? "bg-[#f0f0f0]" : "bg-button" )
        if(type === 'goals') {
            dispatch(setGoals(text))
        }else if(type === 'topics') {
            dispatch(setTopics(text))
        }
    }





    return(
        <div 
            className={`rounded-3xl p-3 text-center border flex justify-center items-center ${color==="bg-[#f0f0f0]"? "border-lightg": "border-transparent text-white"} ${color} cursor-pointer `}
            onClick={handleClick}>
            {text}
        </div>
    )
}