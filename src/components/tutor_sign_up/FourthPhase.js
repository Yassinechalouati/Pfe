
function FourthPhase() {
    return (
        <div className="w-full h-[80%] space-y-2 py-3 overflow-y-auto"> 
            <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">    
                <span className="text-black text-lg font-bold text-center">
                    Let's test your connection
                </span>
                <span className="text-black text-center">
                    Our students learn best when technology is working smoothly.
                </span>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col justify-center items-center">
                        <img src="/wifi.png" className="h-32 w-32" alt="wifi"></img>
                        <span className="text-darkg text-sm">High-speed internet connection</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <img src="/webcam.png" className="h-32 w-32" alt="webcam"></img>
                        <span className="text-darkg text-sm">Built-in or external webcam</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <img src="/lighting.png" className="h-32 w-32" alt="lighting"></img>
                        <span className="text-darkg text-sm">Good lighting</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <img src="/radio.png" className="h-32 w-32" alt="radio"></img>
                        <span className="text-darkg text-sm">Microphone or headset</span>
                    </div>
                </div>
                <span className="text-black text-center">
                    Start the test when you are ready with the setup you will use to tutor.
                </span>
            </div>
        </div>
    );
}

export default FourthPhase;