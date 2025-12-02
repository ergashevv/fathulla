import React from 'react';
import smallScreenIcon from "../../images/fullscreen-icon.svg";
import fullScreenIcon from "../../images/fullscreenicon.svg";
import prevIcon from "../../images/prev-icon.svg";
import nextIcon from "../../images/next-icon.svg";
import playIcon from "../../images/play-icon.svg";
import pauseIcon from "../../images/pause-icon.svg";
import mutedIcon from "../../images/muted-icon.svg";
import unMutedIcon from "../../images/unmuted.svg";

const Control = ({
                     onPlayPause,
                     playing,
                     onRewind,
                     onForward,
                     played,
                     onSeek,
                     onToggleFullScreen,
                     fullscreen,
                     muted,
                     onToggleMute,
                     show,
                 }) => {

    const handleProgressClick = (e) => {
        const progressContainer = e.target.getBoundingClientRect();
        const clickPosition = e.clientX - progressContainer.left;
        const percentageClicked = clickPosition / progressContainer.width;
        onSeek(null, percentageClicked * 100);
    };

    return (
        <div
            className={`control-container ${show ? 'visible' : 'hidden'}`}
        >
            <div className="top_container">
                <div
                    onClick={onToggleFullScreen}
                    className="fullscreen-icon"
                >
                    <img
                        src={fullscreen ? smallScreenIcon : fullScreenIcon}
                        alt="Full screen icon"
                    />
                </div>
                <div
                    onClick={onToggleMute}
                    className="fullscreen-icon"
                >
                    <img
                        src={muted ? mutedIcon : unMutedIcon}
                        alt="Mute or unmute icon"
                    />
                </div>
            </div>
            <div className="mid__container">
                <div
                    className="icon__btn"
                    onClick={onRewind}
                >
                    <img
                        src={prevIcon}
                        alt="Prev icon"
                    />
                </div>

                <div
                    className="icon__btn play__btn"
                    onClick={onPlayPause}
                >
                    <img
                        src={playing ? pauseIcon : playIcon}
                        alt="Pause icon"
                    />
                </div>

                <div
                    className="icon__btn"
                    onClick={onForward}
                >
                    <img
                        src={nextIcon}
                        alt="Next icon"
                    />
                </div>
            </div>
            <div
                className="bottom__container"
            >
                <div
                    className="_bottom__container"
                    onClick={handleProgressClick}
                >
                    <div
                        className="bottom__progressbar"
                    >
                        <div
                            className="bottom-progressbar-filled"
                            style={{width: `${played * 100}%`}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Control;