import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {setEmail, setPassword} from '../../state/slices/loginSlice'

export default function Normal() {
    const loginData = useSelector(state => state.loginData)

    const dispatch = useDispatch()

    //handling the email field when typing
    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value))
    };
    
    //handling the password field when typing
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value))
    };

    

    return(
        <div className="w-full flex flex-col space-y-5 items-center">
            <div className="w-full">
                <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                <input
                    className="shadow text-sm appearance-none border rounded-lg w-full h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    value={loginData.email}
                    required
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
            </div>
            <div className="w-full">
                <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                <input
                    className="shadow text-sm rounded-lg appearance-none border w-full  h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    value={loginData.password}
                    required
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
            </div>
            <div className="mb-4 text-sm">
                <button className="text-blue-500 underline">Forgot your password?</button>
            </div>
            <button type="submit" className="w-full bg-button hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign In
            </button>
            <div className="mt-4 text-sm">
                <p>Don't have an account? <button className="text-blue-500 underline">Sign up</button></p>
            </div>
        </div>
    );
}
