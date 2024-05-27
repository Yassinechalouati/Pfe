import { fetchFile, handleLessonDifficultyColor } from "../Global/functions";


function Course(props) {

    const handleDownload= () => {
        const fetchData = async () => {
            try {
                const response = await fetchFile(props.course.Course, "courses", "tutor", props.course.tutorId)
                const byteCharacters = atob(response.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                // Create a Blob from the byteArray
                const blob = new Blob([byteArray], { type: 'application/pdf' });

                // Create a link element and trigger the download
                const link = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute('download', `${props.course.title}.pdf`); // Set the file name
                document.body.appendChild(link);
                link.click();

                // Clean up
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {   
                console.log(error);
            }
        }

        fetchData()
    }

    return (
        <div className="relative group flex flex-col w-56 min-h-[450px] max-h-[450px] space-y-6 pb-3 rounded-3xl border hover:bg-lightg">
            <img 
                src={`/coursecovers/${props.course.courseCover}`} 
                alt={props.course.courseCover} 
                className="min-h-36 min-w-full max-h-36 max-w-full object-cover rounded-t-3xl"
            />
            <div className={`absolute top-[-25px] right-0 ${props.course.Type ==="Free"? "bg-elements" : "bg-star"} text-white text-xs font-bold py-1 px-4 rounded-tr-3xl rounded-bl-xl shadow-md`}>
                {props.course.Type}
            </div>
            <div className="flex flex-col space-y-3 px-4 cursor-pointer scrollbar-hidden overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <div className="self-start flex space-x-1 items-center flex-wrap">
                    <span className={`text-xs text-center p-2 rounded-full ${handleLessonDifficultyColor(props.course.Level, 'other')}`}>
                        {props.course.Level}
                    </span>
                    <span className="text-xs text-center text-white p-2 min-w-5 rounded-full bg-button2">
                        {props.course.numberOfPages} page(s)
                    </span>
                </div>
                <div className="py-2 flex flex-col space-y-1">
                    <span className="font-bold truncate">
                        {props.course.title}
                    </span>
                    <span className="text-xs text-left truncate text-button2 rounded-full">
                        #{props.course.Category}
                    </span>
                </div>
                <span className="text-sm overflow-y-auto break-before-avoid scrollbar-hidden" style={{ scrollbarWidth: 'none' }}>
                    {props.course.description}
                </span>
            </div>
            <div className="flex justify-center mt-36 items-center">
                <button onClick={handleDownload} className="px-4 py-1 text-white text-sm rounded-md text-center bg-elements">
                    Download
                </button>
            </div>
        </div>
    );
}

export default Course;