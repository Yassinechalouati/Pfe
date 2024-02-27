import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setListOfEducationVisibility, addEducation, resetListOfEducation } from "../../state/slices/listSlice";
import Modal from "../Global/modal";
import { MdLanguage } from "react-icons/md";
import ModalContent from "./ModalCotent";


function Education(props) {

    const dispatch = useDispatch()
    const listOfEducationVisibility = useSelector(state => state.listData.listOfEducationVisibility)
    const listOfEducation = useSelector(state => state.listData.listOfEducation)

    const handleAddEducation = (e) => {
        e.preventDefault()
        dispatch(addEducation({id: listOfEducation.length, title:'', description:'', tag: props.Tags.sort()[0]}))
    }

    const handleSave = () => {
        dispatch(setListOfEducationVisibility(false))
    }

    const handleCancel = () => {
        dispatch(setListOfEducationVisibility(false))
        dispatch(resetListOfEducation())
    }

    const content = [
        <div key="0" className="h-full w-full flex flex-col justify-between overflow-y-auto space-y-5">
            {listOfEducation.map((field, index) => {
                return <ModalContent Tags={props.Tags} key={index} index={field.id} type='education' ></ModalContent>
            })}
        </div>,
        <button key="1" onClick={handleAddEducation} type="button" className="text-button self-start px-4 py-2">
                ADD EDUCATION
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

    const handleAddEducationModal = (e) => {
        e.preventDefault()
        dispatch(setListOfEducationVisibility(true))

    }
    return (
        <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
                {
                    listOfEducationVisibility?
                    <Modal content={content} title={props.title} icon={<MdLanguage size="22" color="#FFA447"></MdLanguage>}></Modal>
                    :
                    null
                }
            <div className="w-full h-[15%] flex items-center space-x-2 ">
                {props.icon}
                <span className="text-black font-bold h-full text-sm">{props.title}</span>
            </div>
            <span className="text-darkg h-full text-sm">{props.placeholder}</span>
            <button onClick={handleAddEducationModal} className=" bg-elements text-sm text-white w-36 h-10 rounded-lg">
                ADD EDUCATION
            </button>
        </div>
    );
}

export default Education;