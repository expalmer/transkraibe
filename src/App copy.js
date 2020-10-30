import React, { useEffect, useRef, useState } from 'react'

import video2 from './videos/video2.mp4'

function App() {

  const video = useRef('video')
  const point = useRef('point')

  const [pins, setPins] = useState({
    start: null,
    end: null
  })

  const [currentTime, setCurrentTime] = useState(video.current.currentTime)

  const [state, setState] = useState({
    duration: 0,
    currentTime: 0,
    position: 0,
  })

  const handleKeyContainer = e => {
    e.preventDefault()
    const { paused } = video.current
    const isSpaceBar = +e.keyCode === 32
    if (isSpaceBar) {
      if (paused) {
        video.current.play()
        return
      }
      video.current.pause()
    }
  }

  const getWidthDiff = (clientWidth) => {
    return (window.innerWidth - clientWidth) / 2
  }

  useEffect(() => {
    setCurrentTime(video.current.currentTime)
  }, [video.current.currentTime])

  useEffect(() => {
    window.addEventListener('keyup', handleKeyContainer)
    return () => {
      window.removeEventListener('keyup', handleKeyContainer)
    }
  }, [])

  const onTimeUpdate = () => {
    const { duration, currentTime } = video.current
    const { clientWidth } = point.current

    const diff = getWidthDiff(clientWidth)

    const position = ((clientWidth - diff)/ duration) * currentTime
    setState({ ...state, position })
  }

  const handleMarker = (e) => {
    const { clientX } = e
    const { clientWidth } = point.current
    const diff = getWidthDiff(clientWidth)

    const realWidth = clientX - diff

    const { duration } = video.current
    const nextTime = (duration / realWidth) * (clientX)
    console.log('nextTime', nextTime)
    video.current.currentTime = nextTime
  }

  const handlePlayPause = () => {
    if (video.current.paused) {
      video.current.play()
      return
    }
    video.current.pause()
  }

  const handlePlaybackRate = (value) => {
    video.current.playbackRate = value
  }

  return (
    <div className="container">
      <div className="video">
        <video controls ref={video} onTimeUpdate={onTimeUpdate}>
          <source src={video2} type="video/mp4" />
        </video>
      </div>
      <div className="control">
        <div className="control__buttons">
          <button className="button" onClick={handlePlayPause}>play</button>
          <button onClick={() => handlePlaybackRate(0.2)}>0.2</button>
          <button onClick={() => handlePlaybackRate(0.5)}>0.5</button>
          <button onClick={() => handlePlaybackRate(0.7)}>0.7</button>
          <button onClick={() => handlePlaybackRate(1)}>1x</button>
          <button onClick={() => handlePlaybackRate(1.5)}>1.5x</button>
          <button onClick={() => handlePlaybackRate(2)}>2x</button>
        </div>
        <div className="control__cursor">
          {parseInt(currentTime || 0, 10)} / {parseInt(video.current.duration, 10)}
        </div>
        <div className="pins">
          <div className="marker" ref={point} onClick={handleMarker}></div>
          <div className="pin pin--start" style={{ left: `${pins.start}px` }}></div>
          <div className="pin pin--end" style={{ left: `${pins.end}px` }}></div>
          <div
            className="tempo"
            style={{ transform: `translateX(${state.position}px)` }} />
        </div>
      </div>
    </div>
  );
}

export default App;
