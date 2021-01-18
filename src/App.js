import React, { useState, useEffect } from "react";

import { getAudioBuffer, getContext } from "./utils";

import {
  VideoSources,
  VideoWrapper,
  Player,
  VideoSpeedControls,
  VideoTempoControls,
  VideoWave,
  VideoMarkers,
} from "./components";

import { useVideoActions } from "./hooks/use-video-actions";

function App() {
  const [videoSource, setVideoSource] = useState(null);
  const [video, setVideo] = useState({
    buffer: null,
    source: null,
  });

  useEffect(() => {
    if (videoSource) {
      getAudioBuffer(videoSource, getContext()).then((buffer) => {
        setVideo({
          buffer,
          source: videoSource,
        });
      });
    }
    return () => {
      setVideo({
        buffer: null,
        source: null,
      });
    };
  }, [videoSource]);

  const {
    videoRef,
    videoOnTimeUpdate,
    playbackRate,
    changePlaybackRate,
    changePosition,
    changeStartPosition,
    changeEndPosition,
    position,
    startPosition,
    endPosition,
  } = useVideoActions();

  return (
    <div className="container">
      <VideoSources onSelectedVideoSource={setVideoSource} />
      <VideoWrapper>
        <Player
          videoRef={videoRef}
          source={video.source}
          videoOnTimeUpdate={videoOnTimeUpdate}
        />
        <VideoSpeedControls
          hasVideo={!!video.source}
          playbackRate={playbackRate}
          changePlaybackRate={changePlaybackRate}
        />
        <VideoTempoControls>
          <VideoMarkers
            startPosition={startPosition}
            endPosition={endPosition}
            changeStartPosition={changeStartPosition}
            changeEndPosition={changeEndPosition}
          />
          <VideoWave
            videoBuffer={video.buffer}
            changePosition={changePosition}
            position={position}
          />
        </VideoTempoControls>
      </VideoWrapper>
    </div>
  );
}

export default App;
