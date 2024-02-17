import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../state/slices/userSlice';

export default function Normal() {
    //getting userData from the store
    const userData = useSelector((state) => state.userData );

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch();

    //handling the email field when typing
    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    };
    
    //handling the password field when typing
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value));
    };

    return(
        <div className="w-full flex flex-col space-y-5 items-center">
            <div className="w-full">
                <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                <input
                    className="shadow text-sm appearance-none border rounded-lg w-full h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    value={userData?.email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
            </div>
            <div className="w-full">
                <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                <input
                    className="shadow text-sm rounded-lg appearance-none border w-full  h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    value={userData?.password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
            </div>
            <div className="mb-4 text-sm">
                <button className="text-blue-500 underline">Forgot your password?</button>
            </div>
            <button className="w-full bg-button hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign In
            </button>
            <div className="mt-4 text-sm">
                <p>Don't have an account? <button className="text-blue-500 underline">Sign up</button></p>
            </div>
        </div>
    );
}
