import Mail_ from "./mail_signin";
import Normal from "./normal_signin";

function Card_(){
    return (
        <div className="bg-white rounded-lg shadow-lg px-6 py-2 justify-center flex flex-col space-y-7 w-[25%] h-[90%]">
            <Mail_></Mail_>
            <div className="flex w-full justify-center items-center">
                <hr className="h-1 w-[47%] "></hr>
                <span className="w-[6%] text-center text-darkg">OR</span>
                <hr className="h-1 w-[47%]"></hr>
            </div>
            <Normal></Normal>
        </div>
    )
}

export default Card_;
