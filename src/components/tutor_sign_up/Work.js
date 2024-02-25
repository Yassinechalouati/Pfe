import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { MdCancel } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io"
import { setWorkExperienceDescription, setWorkExperienceTag, setWorkExperienceTitle } from "../../state/slices/listSlice"



function Work(props) {
    const listOfWorkExperience = useSelector(state => state.listData.listOfWorkExperience)
    const dispatch = useDispatch()

    const Tags = [
        'Education',
        'It',
        'Advertising',
        'Agriculture',
        'Entrepreneurship',
        'Government',
        'Law',
        'Customer Support'
    ]


    const handleTitleChange = (e) => {
        dispatch(setWorkExperienceTitle({id: props.index, title: e.target.value, description:listOfWorkExperience[props.index].description, tag: listOfWorkExperience[props.index].tag}))
    }
    
    const handleTagChange = (e) => {
        dispatch(setWorkExperienceTag({id: props.index, title: listOfWorkExperience[props.index].title, description:listOfWorkExperience[props.index].description, tag: e.target.value}))
    }

    const handleDescriptionChange = (e) => {
        dispatch(setWorkExperienceDescription({id: props.index, title: listOfWorkExperience[props.index].title, description: e.target.value, tag: listOfWorkExperience[props.index].tag}))
    }

    const handleDelete =(e) => {
        

    }

    return (
        <>
            <div className="flex h-full w-full justify-between items-center">
                <input onChange={handleTitleChange} placeholder='Title' value={listOfWorkExperience[props.index]?.title} type="text" className=" w-[70%] block appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="flex h-full w-full justify-between items-center">
                <div className="relative flex flex-col w-[70%]">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        name="languages" value={listOfWorkExperience[props.index]?.tag} onChange={handleTagChange}
                    >
                        {
                            Tags.sort().map((Tag, index)=> {
                                return <option key={index} value={Tag}>{Tag}</option>
                            })
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <IoIosArrowDown></IoIosArrowDown>
                    </div>
                </div>
                {
                    props.index === 0?
                    null
                    :
                    <MdCancel onClick={handleDelete} size="23" color="#767676" className="cursor-pointer"></MdCancel>
                }
            </div>
            <textarea onChange={handleDescriptionChange} value={listOfWorkExperience[props.index]?.description} placeholder='Write something about it...' className="block w-[70%] appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline resize-none"></textarea>
            <hr className="h-1 w-full"></hr> 
        </>
    );
}

export default Work;