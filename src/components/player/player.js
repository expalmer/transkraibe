import "./player.css";

export const Player = ({
  videoRef = null,
  source = null,
  onVideoTimeUpdate = () => {},
  onVideoLoadStart = () => {},
  controls = true,
}) => {
  return (
    <div className="player">
      {source && (
        <video
          key={`source=${source}`}
          ref={videoRef}
          onTimeUpdate={onVideoTimeUpdate}
          onLoadStart={onVideoLoadStart}
          controls={controls}
          autoPlay
        >
          <source src={source} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
