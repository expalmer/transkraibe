import "./player.css";

export const Player = ({
  videoRef = null,
  source = null,
  onVideoTimeUpdate = () => {},
  onVideoLoadStart = () => {},
  onLoaded = () => {},
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
          onLoadedData={onLoaded}
          controls={controls}
          autoPlay
        >
          <source src={source} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
