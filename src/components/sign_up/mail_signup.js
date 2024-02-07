import { FcGoogle } from "react-icons/fc";


export default function Mail() {
    return(
        <div className="w-full cursor-pointer p-2 flex justify-center hover:shadow items-center space-x-3 border border-[#E5E5E5] rounded-xl">
                <FcGoogle size="23" />
                <span className="font-semibold text-sm">Sign up with Google</span>
        </div> 
    );

}