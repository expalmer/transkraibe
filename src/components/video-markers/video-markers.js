import { useRef } from "react"
import Draggable from 'react-draggable'

import './video-markers.css'

import { getPosition } from '../../utils'

export const VideoMarkers = ({
  videoBuffer,
  position,
  changePosition=()=> {},
  changeStartPosition=()=> {},
  changeEndPosition=()=> {},
}) => {

  const trackRef = useRef()
  const startRef = useRef()
  const endRef = useRef()

  const dragStartHandlers = {
    onStop: () => {
      const width = getPosition(trackRef.current, startRef.current)
      const nextPosition = width / trackRef.current.clientWidth
      changeStartPosition(nextPosition)
    }
  }

  const dragEndHandlers = {
    onStop: () => {
      const width = getPosition(trackRef.current, endRef.current)
      const nextPosition = width / trackRef.current.clientWidth
      changeEndPosition(nextPosition)
    }
  }

  return (
    <div className="video-markers" ref={trackRef}>
      <Draggable axis="x" {...dragStartHandlers} bounds={{ left: 0, right: 640 }}>
        <div className="video-markers__start" ref={startRef}></div>
      </Draggable>
      <Draggable axis="x" {...dragEndHandlers} bounds={{ left: -640, right: 0 }}>
        <div className="video-markers__end" ref={endRef}></div>
      </Draggable>
    </div>
  )
}


      