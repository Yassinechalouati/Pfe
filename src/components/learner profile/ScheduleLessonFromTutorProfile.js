import BigCalendar from './BigCalendar'

function ScheduleLessonFromTutorProfile(props) {
    

    return (
        <div className="flex flex-col space-y-3 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Schedule a lesson</h4>
                <BigCalendar></BigCalendar>
        </div>
    );
}

export default ScheduleLessonFromTutorProfile;