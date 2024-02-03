import { IoMdInformationCircleOutline } from "react-icons/io";


export default function RadioButton({title, infos}) {


    return (
        <div className="flex flex-wrap gap-2 self-start">
            <label  className="flex items-center space-x-2 h-7">
                <div className=" rounded-full w-6 h-6  flex flex-shrink-0 justify-center items-center relative">
                    <input aria-labelledby="label1" type="radio" name="radio" className="checkbox  border-button appearance-none  focus:outline-none border-2 rounded-full absolute cursor-pointer w-full h-full checked:border-none" />
                    <div className="check-icon hidden border-8 border-button rounded-full w-full h-full z-1"></div>
                </div>
                <span className="cursor-pointer text-sm">{title}</span>
                <div 
                    className="myDIV flex justify-center items-center"
                    >
                    <IoMdInformationCircleOutline 
                    color="grey" 
                    size="20" 
                    ></IoMdInformationCircleOutline>
                </div>
                <div className={`hide p-2 w-56 text-left rounded-md bg-black text-white text-xs`}>
                        {infos}
                </div>
            </label>
        </div>
      );
}