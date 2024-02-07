import { GiCheckMark } from "react-icons/gi";


export default function Step({num, title, step}) {
    
    return(
        <div className="flex flex-col items-center space-y-1">
            <div className={`rounded-full text-lg font-bold w-12 h-12 ${step === num-1? "font-bold border-[3px]": "font-normal border-2"} ${num-1<step? "bg-elements border-none": "border-black "} flex justify-center items-center`}>
                {
                    num-1<step?
                    <GiCheckMark size="22" color="black"></GiCheckMark>
                    :
                    num
                }
            </div>
            <div className={`text-sm  ${step === num-1? "font-bold": ""}`}>
                {title}
            </div>
        </div>
    )
}