
import { useSelector, useDispatch } from "react-redux"
import { setLessonDifficulty, setLessonTopic} from "../../../state/slices/Schedule"
import { MdNavigateBefore } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { FaBook } from "react-icons/fa";
import { IoFlame } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa"
import { MdNavigateNext } from "react-icons/md"



function SecondStep(props) {

    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()

    const handleLessonTopicChange = (e) => {
        dispatch(setLessonTopic(e.target.value))
    }

    const handleLessonDifficultyChange = (e) => {
        dispatch(setLessonDifficulty(e.target.value))
    }


    const topics = [
        'Exam Preparation',
        'Asking for advice',
        'Medical Learning',
        'Entrepreneurship'
    ]

    const difficulty = [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert'
    ]

    const handleLessonDifficultyColor = () => {
        const size="25"
        switch (scheduleData.lessonDifficulty) {
            case 'Beginner':
            return <IoFlame size={size} className="text-elements" />
            case 'Intermediate':
            return <IoFlame size={size} className="text-yellow-500" />
            case 'Advanced':
            return <IoFlame size={size} className="text-orange-500" />
            case 'Expert':
            return <IoFlame size={size} className="text-red-500" />
            default:
            return <IoFlame size={size} className="text-active"></IoFlame>
        }

    }

    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <MdNavigateBefore onClick={props.moveBackwards} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
                <span className="block text-center text-black font-semibold text-lg">Schedule</span>
            </div>
            <div className="flex p-2 items-center justify-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <FaBook size="25" className="text-active" />
                <span className="text-active">Choose lesson topic</span>
                <div className="flex-grow"></div>
                <select onChange={handleLessonTopicChange} value={scheduleData.lessonTopic} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Choose lesson topic</option>
                    {topics.map((topic, index) => (
                        <option key={index} value={topic}>{topic}</option>
                    ))}
                </select>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                {handleLessonDifficultyColor()}
                <span className="text-active">Choose lesson difficulty</span>
                <div className="flex-grow"></div>
                <select onChange={handleLessonDifficultyChange} value={scheduleData.lessonDifficulty} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Choose lesson topic</option>
                    {difficulty.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div onClick={props.moveForward} className={`flex p-2 ${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'hover:bg-lightg cursor-pointer': ''} rounded-md items-center  space-x-6`}> 
                <FaChalkboardTeacher size="25" className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-active' : 'text-disabled'} `}></FaChalkboardTeacher>
                <span className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-active' : 'text-disabled'}`}>Select tutor</span>
                <div className="flex-grow"></div>
                <MdNavigateNext size="25" className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-elements' : 'text-disabled'}`}></MdNavigateNext>
            </div>
        </>
    );
}

export default SecondStep;