import {useDispatch, useSelector} from 'react-redux'
import { setEmail, setPassword, setConfpass } from '../../state/slices/userSlice';

export default function Fields() {
    //getting userData from the store
    const userData = useSelector((state) => state.userData )

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    //handling the email field when typing
    const handleEmailChange =(e) => {
        dispatch(setEmail(e.target.value))
    }
    
    //handling the password field when typing
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value))
    }

    //handling the confirm password field when typing 
    const handleConfirmPasswordChange = (e) => {
        dispatch(setConfpass(e.target.value))
    }

    return(
        <div className="w-full flex flex-col space-y-5 items-center">
            
            <div className="grid grid-cols-1 gap-4 w-full">
                <div className="flex flex-col">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        value = {userData?.email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                    <input
                        className="shadow text-sm rounded-lg appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value = {userData?.password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                    />
                </div>
                <div className="flex flex-col">   
                    <label className="block text-[#000] text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value = {userData?.confpass}
                        pattern= {userData?.password}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                    />
                </div>
            </div>
        </div>
    )
}