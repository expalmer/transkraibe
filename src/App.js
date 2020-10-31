import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import Waveform from 'waveform-react'
import classnames from 'classnames'

import video2 from './videos/video2.mp4'

import { getContext, getAudioBuffer, getDragNextTime, getNextTime, getPosition } from './utils'

import { useKeyBindings } from './hooks/use-key-bindings'

import { Video } from './components/video'

function App() {

  const video = useRef()
  const trackRef = useRef()
  const iniRef = useRef()
  const endRef = useRef()

  const [position, setPosition] = useState(0)
  
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

  const setCurrentTime = (time) => video.current.currentTime = time

  const handlePlayPause = () => {
    if (video.current.paused) {
      video.current.play()
    } else {
      video.current.pause()
      return
    }
  }

  useKeyBindings({ handlePlayPause  })

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

  useEffect(() => {
    getAudioBuffer(video2, context)
      .then(buffer => {
        setVideoBuffer(buffer)
      })
  }, [context])

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

  const onPlaybackRate = (value) => () => {
    video.current.playbackRate = value
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
        {video.current.currentTime} {init.nextTime} {ends.nextTime}
      </div>
      <div className="action">
        <div className="action__button">
          <span onClick={onPlaybackRate(0.2)} className={classnames('word', { 'word--active': playbackRate === 0.2 })}>0.2</span>
          <span onClick={onPlaybackRate(0.3)} className={classnames('word', { 'word--active': playbackRate === 0.3 })}>0.3</span>
          <span onClick={onPlaybackRate(0.5)} className={classnames('word', { 'word--active': playbackRate === 0.5 })}>0.5</span>
          <span onClick={onPlaybackRate(0.7)} className={classnames('word', { 'word--active': playbackRate === 0.7 })}>0.7</span>
          <span onClick={onPlaybackRate(1)} className={classnames('word', { 'word--active': playbackRate === 1 })}>1</span>
        </div>
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
        <span onClick={handlePlayPause} className={classnames('word', { 'word--active': !isPaused })}>
          {isPaused ? 'Paused' : 'Playing'}
        </span>
      </div>
    </div>
  );
}

export default App;
