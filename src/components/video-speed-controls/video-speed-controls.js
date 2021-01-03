import classnames from "classnames";

import "./video-speed-controls.css";

const speeds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.3, 1.5, 2];

export const VideoSpeedControls = ({
  hasVideo,
  playbackRate,
  changePlaybackRate,
}) => {
  return (
    <div className="video-speed-control">
      {speeds.map((speed) => (
        <button
          className={classnames("video-speed-control__item", {
            "video-speed-control__item--active":
              hasVideo && playbackRate === speed,
          })}
          key={speed}
          onClick={() => hasVideo && changePlaybackRate(speed)}
        >
          {speed}
        </button>
      ))}
    </div>
  );
};
