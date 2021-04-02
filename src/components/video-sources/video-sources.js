import "./video-sources.css";

import { videoSamples } from "./video-samples";

export const VideoSources = ({ onSelectedVideoSource }) => {
  const onSelectedSample = (e) => {
    const { value } = e.target;
    if (!value) return;
    const video = videoSamples.find((x) => x.name === value);
    onSelectedVideoSource(video.source);
  };

  const onSelectedFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const selectedVideoUrl = URL.createObjectURL(selectedFile);
      onSelectedVideoSource(selectedVideoUrl);
    }
  };

  return (
    <div className="video-sources">
      <label for="video-input-file" className="video-sources__select">
        <input
          id="video-input-file"
          type="file"
          accept="video/mp4"
          onChange={onSelectedFile}
        />
        Upload an mp4 video
      </label>
      <p>or</p>
      <select
        id="video-sample-selector"
        className="video-sources__select"
        onChange={onSelectedSample}
      >
        <option value="">Select a sample</option>
        {videoSamples.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
