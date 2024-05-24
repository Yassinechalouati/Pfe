import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

function VoiceMessage(props) {
    const [listening, setListening] = useState(false);
    const recognition = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please use Google Chrome.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition.current = new SpeechRecognition();
        recognition.current.lang = 'en-US';
        recognition.current.interimResults = false;

        recognition.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            props.setText(transcript);
            setListening(false);
        };

        recognition.current.onerror = (event) => {
            console.error('Speech recognition error', event);
            setListening(false);
        };

    }, []);

    const toggleListening = () => {
        if (listening) {
            recognition.current.stop();
        } else {
            recognition.current.start();
        }
        setListening(!listening);
    };

    return (
        <div>
            <button type="button" onClick={toggleListening} className="inline-flex items-center justify-center rounded-full p-2 transition duration-200 ease-in-out text-white bg-button2 hover:bg-button2 focus:outline-none">
                {listening ? <FaMicrophoneSlash className="text-white" /> : <FaMicrophone className="text-white" />}
            </button>
        </div>
    );
}

export default VoiceMessage;