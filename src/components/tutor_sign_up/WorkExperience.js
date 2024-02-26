import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setListOfWorkExperienceVisibility, resetListOfWorkExperience } from "../../state/slices/listSlice"
import { MdWork } from "react-icons/md"
import ModalContent from "./ModalCotent"
import Modal from "../Global/modal"
import { addWorkExperience } from "../../state/slices/listSlice"

function WorkExperience(props) {
    const listOfWorkExperienceVisibility = useSelector(state => state.listData.listOfWorkExperienceVisibility)
    const listOfWorkExperience = useSelector(state => state.listData.listOfWorkExperience)

    const dispatch = useDispatch()

    const handleWorkExperienceModal = (e) => {
        e.preventDefault()
        dispatch(setListOfWorkExperienceVisibility(true))
    }

    const handleAddWorkExperience = () => {
        dispatch(addWorkExperience({id: listOfWorkExperience.length, title:'', description:'', tag: props.Tags.sort()[0]}))
    }
    
    const handleSave = () => {
        dispatch(setListOfWorkExperienceVisibility(false))
    }

    const handleCancel = () => {
        dispatch(setListOfWorkExperienceVisibility(false))
        dispatch(resetListOfWorkExperience())
    }
    
    const content = [
        <div key="0" className="h-full w-full flex flex-col justify-between overflow-y-auto space-y-5">
            {listOfWorkExperience.map((field, index) => {
                return <ModalContent Tags={props.Tags} key={index} index={field.id} type='work experience' ></ModalContent>
            })}
        </div>,
        <button key="1" onClick={handleAddWorkExperience} type="button" className="text-button self-start px-4 py-2">
                ADD WORK EXPERIENCE
        </button>,
        <div key="2" className="flex justify-end space-x-4">
            <button onClick={handleCancel} type="button" className="text-button  px-4 py-2">
                CANCEL
            </button>
            <button onClick={handleSave} type="button" className=" bg-button px-4 py-2 rounded-lg text-white hover:shadow">
                Save
            </button>
        </div>
    ]

    return (
        <>
            {
                listOfWorkExperienceVisibility?
                <Modal content={content} title={props.title} icon={<MdWork size="22" color="#FFA447"></MdWork>}></Modal>
                :
                null
            }
            <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
                    
                <div className="w-full h-[15%] flex items-center space-x-2 ">
                    {props.icon}
                    <span className="text-black font-bold h-full text-sm">{props.title}</span>
                </div>
                <span className="text-darkg h-full text-sm">{props.placeholder}</span>
                <button onClick={handleWorkExperienceModal} className=" bg-button2 text-sm text-white w-48 h-10 rounded-lg">
                    ADD WORK EXPERIENCE
                </button>
            </div>
        </>
    );
}

export default WorkExperience;