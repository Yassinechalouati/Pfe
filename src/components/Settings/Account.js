import { useSelector } from "react-redux";
import Title from "./Title";
import Field from "./Field";


function Account(props) {
    const learnerData = useSelector(state => state.userData)
    const tutorData = useSelector(state => state.tutorData)

    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const isVerified = firstSegment ==="learner"? learnerData.isVerified : tutorData.isVerified


    
    return (
        <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <Title role={firstSegment} title="Account"></Title>
            <Field field={firstSegment ==="learner"? learnerData.firstname : tutorData.lastname}></Field>
            <Field field={firstSegment==="learner"? learnerData.lastname: tutorData.lastname}></Field>
            <div className="border-b px-2 hover:bg-lightg cursor-pointer justify-between flex items-center border-lightg py-2">
                <span className="text-black font-bold">
                    Email
                </span>
                <div className="flex items-center space-x-2">
                    <span>
                        {
                            firstSegment==="learner"? learnerData.email: tutorData.email
                        }
                    </span>
                    {
                        !isVerified?
                        <div className="p-3 text-white bg-errortext">
                            Unverified
                        </div>
                        :
                        null
                    }
                </div>
                <div className="px-4 py-2 rounded-md bg-button2 text-white"> Save</div>
            </div>
        </div>
    );
}

export default Account;