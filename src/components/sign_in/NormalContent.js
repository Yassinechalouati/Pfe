import MailSignIn from "./mail_signin";
import Normal from "./normal_signin";

function NormalContent({recaptchaRef}) {
    
    return (
        <>
            <MailSignIn></MailSignIn>
            <div className="flex w-full justify-center items-center">
                <hr className="h-1 w-[47%] "></hr>
                <span className="w-[6%] text-center text-darkg">OR</span>
                <hr className="h-1 w-[47%]"></hr>
                
            </div>
            <Normal recaptchaRef={recaptchaRef}></Normal>
        </>
    );
}

export default NormalContent;