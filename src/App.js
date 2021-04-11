import React, { useState, useEffect } from "react";

import { getAudioBuffer } from "./utils";

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
import { useVideoState } from "./hooks";

function App() {
  const [videoSource, setVideoSource] = useState(null);
  const [videoAudioBuffer, setVideoAudioBuffer] = useState(null);

  useEffect(() => {
    if (videoSource) {
      getAudioBuffer(videoSource)
        .then(setVideoAudioBuffer)
        .catch((err) => console.error(err));
    }
    return () => {
      setVideoAudioBuffer(null);
    };
  }, [videoSource]);

  const {
    isVideoLoaded,
    setVideoLoadedState,
    resetVideoState,
  } = useVideoState();

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
    resetVideoControls,
  } = useVideoActions();

  return (
    <div className="container">
      <VideoSources onSelectedVideoSource={setVideoSource} />
      <VideoWrapper>
        {videoAudioBuffer && (
          <Player
            videoRef={videoRef}
            source={videoSource}
            onVideoTimeUpdate={videoOnTimeUpdate}
            onVideoLoadStart={() => {
              resetVideoState();
              resetVideoControls();
            }}
            onLoaded={() => setVideoLoadedState(true)}
          />
        )}
        {videoAudioBuffer && isVideoLoaded && (
          <>
            <VideoSpeedControls
              hasVideo={!!videoSource}
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
                videoBuffer={videoAudioBuffer}
                changePosition={changePosition}
                position={position}
              />
            </VideoTempoControls>
          </>
        )}
      </VideoWrapper>
    </div>
  );
}

export default App;
