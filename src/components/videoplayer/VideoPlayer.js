import React, {useRef} from 'react';
import './videoPlayer.scss'
import play from '../../videoPlayerImage/main controller.svg'
import skipAheadImg from '../../videoPlayerImage/secondary button1.svg'
import skipForwardImg from '../../videoPlayerImage/secondar button2.svg'
import fullScreen from "../../videoPlayerImage/full screen button.svg"


const VideoPlayer = () => {

    const videoRef = useRef(null)

    const toggleFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
            videoRef.current.msRequestFullscreen();
        }
    };

    const playPauseToggle = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 15;
        }
    };
    const skipAhead = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 15;
        }
    };

    const stopVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };
    return (
        <>
            <div className="controls">
                <button className={"fullScreen"} onClick={toggleFullScreen}>
                    <img src={fullScreen} alt=""/>
                </button>
                <button className={"skipAhead"} onClick={skipAhead}>
                    <img src={skipAheadImg} alt=""/>
                </button>
                <button className="play" onClick={playPauseToggle}>
                    <img src={play} alt=""/>
                </button>
                <button className={"skipForward"} onClick={skipForward}>
                    <img src={skipForwardImg} alt=""/>
                </button>
            </div>
        </>
    );
};

export default VideoPlayer;