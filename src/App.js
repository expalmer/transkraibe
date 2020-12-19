import React, { useState, useEffect } from 'react'

import { videosSource } from './videos'

import { getAudioBuffer, getContext } from './utils'

import {
  VideoSources,
  VideoWrapper,
  VideoTag,
  VideoSpeedControls,
  VideoTempoControls,
  VideoWave,
  VideoMarkers
} from './components'

import { useVideoActions } from './hooks/use-video-actions'

function App() {
  
  const [videos] = useState(videosSource)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [video, setVideo] = useState({
    buffer: null,
    source: null
  })

  useEffect(() => {
    if (currentVideo) {
      getAudioBuffer(currentVideo, getContext())
        .then(buffer => {
          setVideo({
            buffer,
            source: currentVideo
          })
        })
    }
    return () => {
      setVideo({
        buffer: null,
        source: null,
      })
    }
  }, [currentVideo])

  const {
    videoRef,
    videoOnTimeUpdate,
    playbackRate,
    changePlaybackRate,
    changePosition,
    changeStartPosition,
    changeEndPosition,
    time,
    position,
    startPosition,
    endPosition
  } = useVideoActions()
  
  return (
    <div className="container">
      <VideoSources currentVideo={currentVideo} videos={videos} handleSelectVideo={setCurrentVideo} />
      <VideoWrapper>
        <VideoTag
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
