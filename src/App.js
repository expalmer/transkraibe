import React from 'react'

import { 
  PlaybackRateAction,
  PlayPauseButton,
  Video,
  TrackSound
} from './components'

import { useVideoActions } from './hooks/use-video-actions'

import videoMp4 from './videos/video.mp4'

function App() {
  const {
    videoRef,
    videoBuffer,
    videoOnTimeUpdate,
    changePlaybackRate,
    changePlayPause,
    changePosition,
    changeStartPosition,
    changeEndPosition,
    currentTime,
    playbackRate,
    isPaused,
    position
  } = useVideoActions({ source: videoMp4 })

  return (
    <div className="container">
      <Video 
        customRef={videoRef} 
        onTimeUpdate={videoOnTimeUpdate}
        source={videoMp4}
      />
      <div className="action">
        <span className="word">{currentTime} &nbsp; <strong>rate: {playbackRate}</strong></span>
      </div>
      <div className="action">
        <PlaybackRateAction
          changePlaybackRate={changePlaybackRate}
          playbackRate={playbackRate} 
        />
      </div>
      <TrackSound
        videoBuffer={videoBuffer}
        position={position}
        changePosition={changePosition}
        changeStartPosition={changeStartPosition}
        changeEndPosition={changeEndPosition}
      />
      <div className="action">
        <PlayPauseButton
          handlePlayPause={changePlayPause}
          isPaused={isPaused}
        />
      </div>
    </div>
  );
}

export default App;
