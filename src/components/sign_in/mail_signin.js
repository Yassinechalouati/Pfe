import { FcGoogle } from "react-icons/fc";


export default function Mail_() {
    return(
        <div className="w-full h-14 cursor-pointer p-2 flex justify-center hover:shadow items-center space-x-3 border border-[#E5E5E5] rounded-xl">
                <FcGoogle size="23" />
                <span className="font-semibold text-sm">Sign in with Google</span>
        </div> 
    );

}