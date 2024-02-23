import Modal from '../Global/modal'
import { MdLanguage } from "react-icons/md";

function Languages(props) {
    return (
        <>
            <Modal title={props.title} icon={<MdLanguage size="22" color="#FFA447"></MdLanguage>}></Modal>
        </>
    );
}

export default Languages;