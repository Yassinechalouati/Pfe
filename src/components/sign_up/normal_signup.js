


export default function Fields() {
    return(
        <div className="w-full flex flex-col space-y-5 items-center">
            <div className="flex flex-col items-center">
                <img src="logo192.png" alt="profilepic" className="h-14 w-14 object-cover cursor pointer rounded-full"></img>
                <span className="text-darkg text-sm">Choose profile picture</span>
            </div>
            <div className="flex w-full justify-between">
                <div className="w-[30%]">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        placeholder="Email"
                    />
                </div>
                <div className="w-[30%]">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                    <input
                        className="shadow text-sm rounded-lg appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="w-[30%]">   
                    <label className="block text-[#000] text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>
        </div>
    )
}