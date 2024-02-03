import {useState} from 'react'


export default function Buttn({text}) {
    //color changer
    const [color, setColor] = useState("bg-[#f0f0f0]")

    //color change logic
    const handleClick = () => {
        setColor( prevValue => prevValue ==="bg-button"? "bg-[#f0f0f0]" : "bg-button" )
        console.log(color)
    }


    return(

        <div 
            className={`rounded-full p-3 text-center border flex justify-center items-center ${color==="bg-[#f0f0f0]"? "border-lightg": "border-transparent text-white"} ${color} cursor-pointer `}
            onClick={handleClick}>
            {text}
        </div>
    )
}