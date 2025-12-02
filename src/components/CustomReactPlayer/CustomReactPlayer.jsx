import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import Control from "./Control";
import "./style.scss";

const CustomReactPlayer = ({url}) => {
    const [showControls, setShowControls] = useState(true);
    const [videoState, setVideoState] = useState({
        playing: true,
        muted: true,
        volume: 0.5,
        played: 0,
        seeking: false,
        Buffer: true,
        fullscreen: false
    });
    const videoPlayerRef = useRef(null);
    const playerWrapperRef = useRef(null);
    const controlTimeoutRef = useRef(null);

    const {
        playing,
        muted,
        volume,
        playbackRate,
        played,
        seeking,
        buffer,
        fullscreen,
    } = videoState;

    const playPauseHandler = () => {
        setVideoState({...videoState, playing: !videoState.playing});
    };

    const rewindHandler = () => {
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
    };

    const fastFowardHandler = () => {
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
    };

    const toggleMute = () => {
        setVideoState({...videoState, muted: !videoState.muted});
    };

    const progressHandler = (state) => {
        if (!seeking) {
            setVideoState({...videoState, ...state});
        }
    };

    const seekHandler = (e, value) => {
        setVideoState({...videoState, played: parseFloat(value) / 100});
    };


    const hideControls = () => {
        setShowControls(false);
    };

    const showControlsTemporarily = () => {
        setShowControls(true);
        if (controlTimeoutRef.current) {
            clearTimeout(controlTimeoutRef.current);
        }
        controlTimeoutRef.current = setTimeout(() => {
            if (playing) {
                hideControls();
            }
        }, 3000);
    };
    const seekChangeHandler = (e, value) => {
        if (!isNaN(value)) {
            videoPlayerRef.current.seekTo(value / 100, 'fraction');
            seekHandler(value);
        }
    };
    const seekMouseUpHandler = (e, value) => {
        setVideoState({...videoState, seeking: false});
        videoPlayerRef.current.seekTo(value / 100);
    };

    const toggleFullScreen = () => {
        const elem = playerWrapperRef.current;

        if (!videoState.fullscreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    const handleFullscreenChange = () => {
        const isFullscreen = document.fullscreenElement === playerWrapperRef.current;

        setVideoState({...videoState, fullscreen: isFullscreen});
    };

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [handleFullscreenChange]);

    useEffect(() => {
        showControlsTemporarily();

        return () => {
            if (controlTimeoutRef.current) {
                clearTimeout(controlTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={playerWrapperRef}
            className="player__wrapper"
            
            onMouseMove={showControlsTemporarily}
            onTouchStart={showControlsTemporarily}
        >
            <ReactPlayer
                ref={videoPlayerRef}
                className="player"
                url={url}
                width="100%"
                height="100%"
                playing={playing}
                muted={muted}
                onProgress={progressHandler}
            />
            <Control
                onPlayPause={playPauseHandler}
                playing={playing}
                onRewind={rewindHandler}
                onForward={fastFowardHandler}
                played={played}
                onSeek={seekChangeHandler}
                onSeekMouseUp={seekMouseUpHandler}
                onToggleFullScreen={toggleFullScreen}
                onToggleMute={toggleMute}
                fullscreen={fullscreen}
                muted={muted}
                show={showControls}
            />
        </div>
    );
};

export default CustomReactPlayer;