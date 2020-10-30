import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import video2 from './videos/video2.mp4'

function App() {

  const video = useRef()
  const trackRef = useRef()

  const iniRef = useRef()
  const endRef = useRef()

  const [restart, setRestart] = useState(false)

  const [cursorPosition, setCursorPosition] = useState(0)

  const [startPosition, setStartPosition] = useState(0)
  const [endPosition, setEndPosition] = useState(640)
  
  const videoChangeCurrentTime = time => video.current.currentTime = time


  function getPosition(a, b) {
    const left1 = a.current.getBoundingClientRect().left
    const left2 = b.current.getBoundingClientRect().left
    return left2 - left1
  }

  function getNextTime(position) {
    return (video.current.duration / trackRef.current.clientWidth) * position
  }


  useEffect(() => {
    let timeout
    const handler = (e) => {
      if (e.keyCode === 32) {
        if (video.current.paused) {
          video.current.play()
        } else {
          video.current.pause()
          return
        }
        // const nextTime = getNextTime(startPosition)
        // video.current.currentTime = nextTime    
      }
    }

    window.addEventListener('keyup', handler)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('keyup', handler)
    }
  }, [startPosition, restart])

  const dragStartHandlers = {
    onStop: (e) => {
      const position = getPosition(trackRef, iniRef)

      // const nextTime = getNextTime(position)
      
      // videoChangeCurrentTime(nextTime)
      setStartPosition(position)
    }
  };

  const dragEndHandlers = {
    onStop: (e) => {
      const position = getPosition(trackRef, endRef)
      
      setEndPosition(position)
    }
  };
  
  const onTimeUpdate = () => {
    const { duration, currentTime } = video.current
    const { clientWidth } = trackRef.current
    const position = ((clientWidth) / duration) * currentTime

    if (position >= endPosition) {
      const nextTime = getNextTime(startPosition)
      video.current.currentTime = nextTime
    }

    setCursorPosition(position)
  }

  return (
    <div className="container">
      <div className="video">
        <video controls ref={video} onTimeUpdate={onTimeUpdate}>
          <source src={video2} type="video/mp4" />
        </video>
      </div>
      <div className="action">
        <div className="track" ref={trackRef}>
          <div className="track__bar">
            <Draggable axis="x" {...dragStartHandlers} bounds={{ left: 0, right: endPosition }}>
              <div className="track__start" ref={iniRef}></div>
            </Draggable>
            <Draggable axis="x" {...dragEndHandlers} bounds={{ left: startPosition - 640, right: 0 }}>
              <div className="track__end" ref={endRef}></div>
            </Draggable>
            <div className="track__current" style={{ transform: `translateX(${cursorPosition}px)` }}></div>
          </div>
          <div>{startPosition} | {endPosition} | {cursorPosition}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
