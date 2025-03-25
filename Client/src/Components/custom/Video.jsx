import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Video.css';

function Video() {
    const canvasRef = useRef(null);
    const videoRefs = useRef([]);
    const [videos, setVideos] = useState([]); // State to hold video data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/videos"); // Adjust the URL as needed
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
                setError("Failed to load videos. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas size to match the first video
        const video = videoRefs.current[0];
        if (video) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;

            // Draw a play button
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.beginPath();
            ctx.moveTo(200, 150);
            ctx.lineTo(250, 180);
            ctx.lineTo(200, 210);
            ctx.closePath();
            ctx.fill();
        }
    }, [videos]); // Re-run when videos change

    return (
        <div id="video-container">
            {loading && <p>Loading videos...</p>}
            {error && <p className="error">{error}</p>}
            <div>
                {videos.map((videoSrc, index) => (
                    <video
                        key={index}
                        ref={el => videoRefs.current[index] = el}
                        src={videoSrc.url} // Assuming videoSrc has a 'url' property
                        controls
                    />
                ))}
            </div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default Video;