
import Mail from './mail_signup'
import Fields from './normal_signup'


export default function First() {
    return (
        <>
            <span className="font-bold self-start text-lg text-[#000] flex-grow">
                Welcome! Choose how to sign up
            </span>
            <span className="text-darkg self-start text-sm">
                By creating an account, you agree to our <span className="underline cursor-pointer"> User Agreement </span>
                and <span className="underline cursor-pointer"> Privacy Policy</span>.
            </span> 
            <span className="text-darkg self-start text-sm"> Already have an account? <span className="underline cursor-pointer">Log in</span> </span>
            <Mail></Mail>
            <div className="flex w-full justify-center items-center">
                <hr className="h-1 w-[47%] "></hr>
                <span className="w-[6%] text-center text-darkg">OR</span>
                <hr className="h-1 w-[47%]"></hr>
            </div>
            <Fields></Fields>
        </>
    )

}