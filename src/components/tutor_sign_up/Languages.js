import Modal from '../Global/modal'
import { MdLanguage } from "react-icons/md";
import Language from '../tutor_sign_up/Language';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { setListOfLanguages, resetLanguageList, setListOfLanguagesVisibility } from '../../state/slices/listSlice';

function Languages(props) {
    const listOfLanguages = useSelector(state => state.listData.listOfLanguages)

    const listOfLanguagesVisibility = useSelector(state => state.listData.listOfLanguagesVisibility)
    
    
    const dispatch = useDispatch()
    
    //add item into the language array
    const handleAddLanguage = () => {
        dispatch(setListOfLanguages({id:listOfLanguages.length, language:'English'}));
    }
    
    //reset the list of languages and remove the modal
    const handleCancel = () => {
        dispatch(setListOfLanguagesVisibility(false))
        dispatch(resetLanguageList())
    }

    //exiting modal and saving
    const handleSave = (e) => {
        e.preventDefault()
        dispatch(setListOfLanguagesVisibility(false))
    }
    
    
    //the content of the language modal
    const content = [
        <div key="0" className="h-full w-full flex flex-col justify-between overflow-y-auto space-y-5">
            {listOfLanguages.map((field, index) => {
                return <Language key={index} index={field.id} ></Language>
            })}
        </div>,
        <button key="1" onClick={handleAddLanguage} type="button" className="text-button self-start px-4 py-2">
                ADD LANGUAGE
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

    //show the languages modal
    const handleLanguageModal = (e) => {
        e.preventDefault()
        dispatch(setListOfLanguagesVisibility(true))
    }
 
    return (
        <>
            {
                listOfLanguagesVisibility?
                <Modal content={content} title={props.title} icon={<MdLanguage size="22" color="#FFA447"></MdLanguage>}></Modal>
                :
                null
            }
            <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
                    
                <div className="w-full h-[15%] flex items-center space-x-2 ">
                    {props.icon}
                    <span className="text-black font-bold h-full text-sm">{props.title}</span>
                </div>
                <span className="text-darkg h-full text-sm">{props.placeholder}</span>
                <button onClick={handleLanguageModal} className=" bg-elements text-sm text-white w-36 h-10 rounded-lg">
                    ADD LANGUAGES
                </button>
            </div>
        </>
    );
}

export default Languages;