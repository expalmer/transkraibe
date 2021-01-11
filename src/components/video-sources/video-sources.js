import "./video-sources.css";

export const VideoSources = ({ videos, handleSelectVideo }) => {
  const handleSelect = (e) => {
    const { value } = e.target;
    if (!value) return;
    const video = videos.find((x) => x.name === value);
    handleSelectVideo(video.source);
  };

  return (
    <div className="video-sources">
      <label for="video-sample-selector">Select a sample:</label>
      <select
        id="video-sample-selector"
        className="video-sources__select"
        onChange={handleSelect}
      >
        <option value="">-</option>
        {videos.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
