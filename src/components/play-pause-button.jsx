import classnames from 'classnames'

export const PlayPauseButton = ({ handlePlayPause, isPaused }) => {
  return (
    <span
      onClick={() => handlePlayPause()}
      className={classnames('keyboard__button keyboard__button--block', { 'keyboard__button--active': !isPaused })}
    >
      {isPaused ? 'Paused' : 'Playing'}
    </span>
  )
}

