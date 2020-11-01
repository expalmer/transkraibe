import classnames from 'classnames'

const buttons = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

export const PlaybackRateAction = ({ onPlaybackRate, playbackRate }) => (
  <div className="keyboard">
    {buttons.map((rate) => (  
      <button
        className={classnames("keyboard__button", { 'keyboard__button--active': playbackRate === rate })} 
        key={rate}
        onClick={() => onPlaybackRate(rate)}
        >
        {rate}
      </button> 
    ))}
  </div>
)