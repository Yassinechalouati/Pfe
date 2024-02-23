import { IoIosArrowDown } from "react-icons/io";

function Modal(props) {
    const languages = [
        'English',
        'French',
        'Arabic',
    ]
    return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] z-50 flex justify-center items-center">
        <div className={`bg-backg w-[90%] px-5 py-3 md:w-[50%] lg:w-[35%] xl:w-[35%] max-h-[80%] min-h-[50%] flex flex-col justify-between rounded-md `} >
            <div className="flex space-x-2 py-3 items-center">
                {
                    props.icon
                }
                <span className="text-black">{props.title}</span>
            </div>
            <div className="h-full w-full flex flex-col overflow-y-auto space-y-5">
                <div className="relative flex flex-col w-[70%]">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        name="languages"
                    >
                        {
                            languages.map((language, index)=> {
                                return <option key={index} value={language}>{language}</option>
                            })
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <IoIosArrowDown></IoIosArrowDown>
                    </div>
                </div>
                <hr className="h-1 w-full"></hr>
            </div>
            <button type="button" className="text-button self-start px-4 py-2">
                ADD LANGUAGE
            </button>
            <div className="flex justify-end space-x-4">
                <button type="button" className="text-button  px-4 py-2">
                    CANCEL
                </button>
                <button type="button" className=" bg-button px-4 py-2 rounded-lg text-white hover:shadow">
                    Save
                </button>
            </div>
        </div>
    </div>
    );
}

export default Modal;