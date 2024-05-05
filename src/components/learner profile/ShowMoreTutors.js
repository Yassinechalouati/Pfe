import { useDispatch, useSelector } from 'react-redux';
import { appendTutorSearchList, incrementPageNumber, setMaxPageNumber } from '../../state/slices/userSlice'
import axiosInstance from '../../interceptors/axiosInterceptor';

function ShowMoreTutors(props) {

    const dispatch = useDispatch()

    const pageNumber = useSelector(state => state.userData.tutorSearchPageNumber)
    const maxPageNumber = useSelector(state => state.userData.maxPageNumber)

    const handleShowMore = async () => {
        try {
            //setLoading(true)
            const response = await axiosInstance.post('http://localhost:5000/SearchTutors', {
                page: pageNumber+1,
                pageSize: 3
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            dispatch(appendTutorSearchList(response.data.tutorsList))
            dispatch(incrementPageNumber())
            dispatch(setMaxPageNumber(response.data.tutorsNumber))
            //setLoading(false)
        }catch(err) {
            console.log(err)
            //setLoading(false)
        }
    }
 
    return (
        <div onClick={handleShowMore} className="w-full py-3 cursor-pointer hover:bg-button2 hover:text-white transition-colors duration-300 border rounded-sm text-center border-button2 text-button2">
                Show More
        </div>
    );
}

export default ShowMoreTutors;