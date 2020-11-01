import React, { useEffect, useRef, useState, useCallback } from 'react'
import Draggable from 'react-draggable'
import Waveform from 'waveform-react'
import classnames from 'classnames'
import _get from 'lodash/get'

import video2 from './videos/video2.mp4'

import { getContext, getAudioBuffer, getDragNextTime, getNextTime, getPosition, formatTime } from './utils'

import { Video } from './components/video'
import { PlaybackRateAction } from './components/playback-rate-action'

function App() {

  const video = useRef()
  const trackRef = useRef()
  const iniRef = useRef()
  const endRef = useRef()

  const [position, setPosition] = useState(0)
  const [, setLastKeyUp] = useState(0)
  
  const [init, setInit] = useState({
    width: 0,
    nextTime: 0
  })

  const [ends, setEnds] = useState({
    width: 0,
    nextTime: 0
  })

  const [context] = useState(getContext())
  const [videoBuffer, setVideoBuffer] = useState(null)

  useEffect(() => {
    getAudioBuffer(video2, context)
      .then(buffer => {
        setVideoBuffer(buffer)
      })
  }, [context])


  const onPlaybackRate = useCallback((value) => {
    if (!video.current) {
      return 
    }
    video.current.playbackRate = value
  }, [])


  const handleRestart = useCallback(() => {
    const position = getPosition(trackRef.current, iniRef.current)
    const nextTime = getDragNextTime(trackRef.current.clientWidth, position, video.current.duration)
    setCurrentTime(nextTime)
    video.current.play()
  }, [])

  const handlePlayPause = useCallback((isTwice) => {
    if (isTwice) {
      handleRestart()
      return
    }
    video.current.paused ? video.current.play() : video.current.pause()
  }, [handleRestart])

  const handleBack = useCallback(() => {
    const nextTime = video.current.currentTime - 5
    setCurrentTime(nextTime < init.nextTime ? init.nextTime : nextTime)
  }, [init.nextTime])
  
  const handleForward = useCallback(() => {
    const nextTime = video.current.currentTime + 5
    setCurrentTime(nextTime > ends.nextTime ? ends.nextTime : nextTime)
  }, [ends.nextTime])

  const handleKeyUp = useCallback(({ keyCode }) => {  
    setLastKeyUp(last => {
      const now = Date.now()
      const isTwice = (now - last) < 500 

      if (keyCode === 32) handlePlayPause(isTwice)
      if (keyCode === 37) handleBack(isTwice)
      if (keyCode === 39) handleForward(isTwice)
    
      return now
    })

  }, [handlePlayPause, handleBack, handleForward])

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])
  
  const setCurrentTime = (time) => video.current.currentTime = time

  useEffect(() => {
    const { clientWidth } = trackRef.current
    const pos1 = getPosition(trackRef.current, iniRef.current)
    setInit({
      width: 0,
      nextTime: getDragNextTime(clientWidth, pos1, video.current.duration)
    })
    const pos2 = getPosition(trackRef.current, endRef.current)
    setEnds({
      width: clientWidth,
      nextTime: getDragNextTime(clientWidth, pos2, video.current.duration)
    })
  }, [])

  const dragStartHandlers = {
    onStop: (e) => {
      const position = getPosition(trackRef.current, iniRef.current)
      const nextTime = getDragNextTime(trackRef.current.clientWidth, position, video.current.duration)
      if (nextTime > video.current.currentTime) {
        setCurrentTime(nextTime)
      }
      setInit({ width: position, nextTime  })
    }
  };

  const dragEndHandlers = {
    onStop: (e) => {
      const position = getPosition(trackRef.current, endRef.current)
      const nextTime = getDragNextTime(trackRef.current.clientWidth, position, video.current.duration)
      if (nextTime < video.current.currentTime) {
        setCurrentTime(nextTime)
      }
      setEnds({ width: position, nextTime  })
    }
  };

  const onTimeUpdate = () => {
    const { duration, currentTime } = video.current
    const pos = currentTime / duration
    if (currentTime > ends.nextTime) {
      setCurrentTime(init.nextTime)
      setPosition(init.position)
      return
    }

    setPosition(pos)
  }

  const onPositionChange = pos => {
    const nextTime = getNextTime(video.current.duration, pos)
    video.current.currentTime = nextTime
  }

  const isPaused = video && video.current && video.current.paused
  const playbackRate = video && video.current && video.current.playbackRate

  const trackWidth = trackRef.current ? trackRef.current.clientWidth : 0
  const initBounds = { left: 0, right: ends.width }
  const endsBounds = { left: init.width - trackWidth, right: 0 }


  return (
    <div className="container">
      <Video 
        customRef={video}
        onTimeUpdate={onTimeUpdate}
        source={video2}
      />
      <div className="action">
        <span className="word">{formatTime(_get(video, 'current.currentTime', 0))}</span>
      </div>
      <div className="action">
        <PlaybackRateAction onPlaybackRate={onPlaybackRate} playbackRate={playbackRate} />
      </div>
      <div className="track" ref={trackRef}>
        <Draggable axis="x" {...dragStartHandlers} bounds={initBounds}>
          <div className="track__start" ref={iniRef}></div>
        </Draggable>
        <Draggable axis="x" {...dragEndHandlers} bounds={endsBounds}>
          <div className="track__end" ref={endRef}></div>
        </Draggable>
        <Waveform
          buffer={videoBuffer}
          height={80}
          width={640}
          markerStyle={{ color: '#ffffff', width: 1 }}
          onPositionChange={onPositionChange}
          plot="bar"
          position={position}
          responsive
          showPosition={true}
          waveStyle={{
            animate: true,
            color: '#31365d',
            pointWidth: 1
          }}
        />
      </div>
      <div className="action">
        <span
          onClick={() => handlePlayPause()}
          className={classnames('keyboard__button keyboard__button--block', { 'keyboard__button--active': !isPaused })}
        >
          {isPaused ? 'Paused' : 'Playing'}
        </span>
      </div>
    </div>
  );
}

export default App;
