import { useRef } from "react"
import Draggable from 'react-draggable'
import Waveform from 'waveform-react'

import {
  getPosition
} from '../utils'

export const TrackSound = ({
  videoBuffer,
  position,
  changePosition,
  changeStartPosition,
  changeEndPosition 
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
    <div className="track" ref={trackRef}>
      <Draggable axis="x" {...dragStartHandlers} bounds={{ left: 0, right: 640 }}>
        <div className="track__start" ref={startRef}></div>
      </Draggable>
      <Draggable axis="x" {...dragEndHandlers} bounds={{ left: -640, right: 0 }}>
        <div className="track__end" ref={endRef}></div>
      </Draggable>
      <Waveform
        buffer={videoBuffer}
        height={80}
        width={640}
        markerStyle={{ color: '#ffffff', width: 1 }}
        onPositionChange={changePosition}
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
  )
}


      