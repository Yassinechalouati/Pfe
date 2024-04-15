import Notification from "./Notification"
import { useEffect, useRef, useState } from "react"
import { IoNotifications } from "react-icons/io5"
import axiosInstance from "../../interceptors/axiosInterceptor"
import { NotificationLoading } from "./LoadingCards"
import { useSelector, useDispatch } from "react-redux"
import { setNotificationsList } from '../../state/slices/NotificationSlice'



function Notifications(props) {
    const notifRef = useRef(null)
    const dispatch = useDispatch()
    
    const [notifications, setNotifications] = useState(false)
    const notificationsList = useSelector(state=> state.notificationsData.notificationsList)
    const [loading, setLoading] = useState(false)
    const [isNotificationEmpty, setIsNotificationEmpty] = useState(false)
    const [option, setOption] = useState(0)

    const notifiationFilterOption = [
        "All", 
        "Pending",
        "Accepted",
    ]
    

    //handle notifications visibility and api calls 
    const handleNotifications = async () => {
        if(!notifications){
            try {
                setLoading(true)
                const notifications = await axiosInstance.post('http://localhost:5000/tutor/getNotifications', {
    
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                setIsNotificationEmpty(notifications.data.message.length===0) //indicated wether there are notifications or not
                dispatch(setNotificationsList(notifications.data.message))
                setLoading(false)
            }catch(err) {
                console.log(err)
                setLoading(false)
            }
        }
        setNotifications(prevValue => !prevValue)
    }

    
    const handleOutsideClick = (event) => {
        if (notifRef.current && !notifRef.current.contains(event.target)) {
            setNotifications(false)
        }
    }

    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        }
      }, [])

      //handling the filter option of the notificaton (All, Accepted, Requests)
      const handleOptions = (e) => {
        setOption(parseInt(e.target.value))
      }

      //handling the list to return based on the option object
      const handleContent = () => {

            let list = []
            if(option === 0 ) {
                list = notificationsList.map((notification, index) => {
                    return <Notification notification={notification} key={index}></Notification>
                })
            }else if(option === 1) {
                const pendingNotification = notificationsList.filter(notification => notification.Accepted === -1)
                list = pendingNotification.map((notification, index) => {
                    return <Notification notification={notification} key={index}></Notification>
                })
            }else if(option === 2) {
                const acceptedNotifications = notificationsList.filter(notification => notification.Accepted === 1)
                list = acceptedNotifications.map((notification, index) => {
                    return <Notification notification={notification} key={index}></Notification>
                })
            }

            //if the list is empty return the empty image else return the list
            return list.length ===0? 
            <img alt="empty" src="/no-data.png" className="w-64 h-64 m-auto object-cover"></img>
            :
            list

        }
    

    return (
        <div ref={notifRef} className="relative py-1">
            <div className="cursor-pointer" onClick={handleNotifications}>
                <span className="absolute hidden lg:flex h-3 w-3 top-0 right-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elements opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-elements"></span>
                </span>
                <IoNotifications
                className="text-darkg hidden lg:block" 
                size="22"></IoNotifications>
            </div>
            <div 
                className={`absolute hidden lg:block right-0 w-96 mt-2 bg-white border border-lightg rounded-md shadow-lg z-10 ${notifications ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} transition-transform duration-300 transform origin-top-right`}
                >
                <div className="flex flex-col p-2 overflow-y-auto max-h-96">
                    <div className="flex px-2 items-center border-b justify-between">
                        <div className="py-5 font-bold">Notifications</div>
                        <span className="text-darkg rounded-lg p-2 hover:bg-lightg cursor-pointer" >Mark all as read</span>
                    </div>
                    <div className="flex px-2 py-2 items-center border-b space-x-3">
                        {
                            notifiationFilterOption.map((option, index) => {
                                return <option key={index} onClick={handleOptions} className="text-sm cursor-pointer" value={index}>{option}</option>
                            })
                        }
                    </div>

                    {
                        loading?
                        <>
                            <NotificationLoading></NotificationLoading>
                            <NotificationLoading></NotificationLoading>
                            <NotificationLoading></NotificationLoading>
                        </>
                        :
                        (
                            isNotificationEmpty?
                            <img alt="empty" src="/no-data.png" className="w-64 h-64 m-auto object-cover"></img>
                            :
                            handleContent()
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Notifications;