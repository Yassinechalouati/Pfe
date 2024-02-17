
function VerifEmail() {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full space-y-1">
            <div className="bg-elements w-24 h-24 rounded-full flex justify-center items-center">
                <img src="/emailVerification.png" alt="emailVerification" className="object-center h-12 w-12"></img>
            </div>
            <span className="text-base font-bold text-center">Email Verification Sent</span>
            <span className="text-sm text-darkg text-center">Check your inbox. If it's not there, please also check your spam folder.</span>
            <span className="text-sm text-darkg text-center">Upon verification, you will be seamlessly progressed to the next stage.</span>
        </div>
    );
}

export default VerifEmail;