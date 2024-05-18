import { useSelector } from "react-redux";
import Title from "./Title";
import Field from "./Field";
import BirthdayField from "./BirthdayField";


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
            <Field title="First Name" field={firstSegment ==="learner"? learnerData.firstname : tutorData.lastname}></Field>
            <Field title="Last Name" field={firstSegment==="learner"? learnerData.lastname: tutorData.lastname}></Field>
            <div className={` ${isVerified? "opacity-70 cursor-not-allowed" :"cursor-pointer"} border-b px-2 hover:bg-lightg justify-between flex items-center border-lightg py-2`}>
                <span className="flex items-center">
                    <span className="text-black font-bold"> 
                        Email
                    </span>
                        {
                            !isVerified?
                            <div className="px-4 py-2 font-semibold rounded-lg text-errortext text-sm underline ">
                               ✗ Unverified
                            </div>
                            :
                           null
                        }
                </span>
                <div className="flex items-center space-x-2">
                    <span>
                        {
                            firstSegment==="learner"? learnerData.email: tutorData.email
                        }
                    </span>
                </div>
                {
                    !isVerified?
                    <div className="px-4 py-2 rounded-md bg-elements text-white"> Verify email</div>
                    :
                    <div className="px-4 py-2 rounded-lg text-white bg-elements">
                        ✓ Verified
                    </div>
                }
            </div>
            <Field title="Password" field="********"></Field>
            <Field title="Mobile Number" field={firstSegment === "learner"? learnerData.tel : tutorData.tel}></Field>
            <BirthdayField></BirthdayField>
        </div>
    );
}

export default Account;