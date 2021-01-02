import "./video-tag.css";

export const VideoTag = ({
  videoRef = null,
  source = null,
  videoOnTimeUpdate = () => {},
  controls = true,
}) => {
  if (!source) {
    return <div className="video-tag" />;
  }

  return (
    <div className="video-tag">
      <video
        ref={videoRef}
        onTimeUpdate={videoOnTimeUpdate}
        controls={controls}
      >
        <source src={source} type="video/mp4" />
      </video>
    </div>
  );
};
