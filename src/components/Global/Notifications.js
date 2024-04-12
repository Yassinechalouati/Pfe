import Notification from "./Notification";

function Notifications(props) {
    return (
        <div 
            className={`absolute hidden lg:block right-0 w-96 mt-2 bg-white border border-lightg rounded-md shadow-lg z-10 ${props.isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} transition-transform duration-300 transform origin-top-right`}
            >
            <div className="flex flex-col p-2">
                <div className="flex px-2 items-center border-b justify-between">
                    <div className="py-5 font-bold">Notifications</div>
                    <span className="text-darkg rounded-lg p-2 hover:bg-lightg cursor-pointer" >Mark all as read</span>
                </div>
                {
                    //case taa mafama hata notif
                    //<img alt="empty" src="/no-data.png" className="w-64 h-64 m-auto object-cover"></img>
                }
                <Notification></Notification>
                <Notification></Notification>
                <Notification></Notification>
            </div>
        </div>
    );
}

export default Notifications;