import Waveform from 'waveform-react'

import './video-wave.css'

export const VideoWave = ({
  videoBuffer,
  changePosition = () => {},
  position = 0,
}) => {
  return (
    <div className="video-wave">
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
          zIndex: -1,
          animate: true,
          color: '#000',
          pointWidth: 1
        }}
      />
    </div>
  )
}