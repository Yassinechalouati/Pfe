
import { useSelector, useDispatch } from "react-redux"
import { setLessonDifficulty, setLessonTopic } from "../../../state/slices/Schedule"
import { MdNavigateBefore } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"


function ThirdStep(props) {

    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()

    const handleLessonTopicChange = (e) => {
        dispatch(setLessonTopic(e.target.value))
    }

    const handleLessonDifficultyChange = (e) => {
        dispatch(setLessonDifficulty(e.target.value))
    }

    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <MdNavigateBefore onClick={props.moveBackwards} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
                <span className="block text-center text-black font-semibold text-lg">Schedule</span>
            </div>
            <div className="flex p-2 items-center justify-center space-x-6"> 
                <IoMdCalendar size="25" className="text-black"></IoMdCalendar>
                <span className="text-darkg">{props.selectedDate}</span>
            </div>
            <span className="text-darkg">Choose lesson topic</span>
            <select value={scheduleData.lessonTopic} onChange={handleLessonTopicChange} className="border active:outline-none border-elements z-50 px-4 py-1 rounded-md">
                <option value="" disabled>Select topic</option>
                <option value="Exam preparation">Exam Preparation</option>
                <option value="Asking for advice">Asking for advice</option>
                <option value="Medical Learning">Medical Learning</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
            </select>
            <span className="text-darkg">Choose lesson difficulty</span>
            <select value={scheduleData.lessonDifficulty} onChange={handleLessonDifficultyChange} className="border active:outline-none border-elements z-50 px-4 py-1 rounded-md">
                <option value="" disabled>Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
            </select>
            <div className="flex justify-center"> 
                <button className="px-4 py-2 bg-button text-white rounded-lg ">Book lesson</button>
            </div>
        </>
    );
}

export default ThirdStep;