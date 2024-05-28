import { useRef, useEffect, useState } from 'react';

const VideoPlaceholder = ({ videoUrl }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [poster, setPoster] = useState('');

    useEffect(() => {
        const captureFrame = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setPoster(dataUrl);
        };

        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadeddata', () => {
                // Set the video time to a point you want to capture
                video.currentTime = 2; // Capture at 2 seconds (adjust as needed)
            });

            video.addEventListener('seeked', captureFrame);
        }

        return () => {
            if (video) {
                video.removeEventListener('seeked', captureFrame);
            }
        };
    }, [videoUrl]);

    return (
        <div>
            <video
                ref={videoRef}
                controls
                poster={poster}
                className="w-full object-cover h-96 rounded-lg mb-2"
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default VideoPlaceholder
