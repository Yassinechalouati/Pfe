import Card from '../components/sign_up/card'
import Errorpop from '../components/sign_up/Error_popup'
import { useSelector } from "react-redux"

export default function Signup() {
    //Signup Error from store
    const error = useSelector((state) => state.Error.error)
    
    return(
        <div className="bg-backg relative w-screen h-screen flex justify-center items-center">
            <Card></Card>
            <Errorpop error={error}></Errorpop>
        </div>
    )
}