import { useRef, useState, useEffect, useCallback } from "react"

import {
  getContext,
  getAudioBuffer
} from '../utils'

export const useVideoActions = ({ source }) => {

  const videoRef = useRef()
  const [context] = useState(getContext())

  const [currentTime, setCurrentTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isPaused, setIsPaused] = useState(true)
  const [, setLastKeyUp] = useState(0)
  const [videoBuffer, setVideoBuffer] = useState(null)
  const [position, setPosition] = useState(0)
  const [startPosition, setStartPosition] = useState(0)
  const [endPosition, setEndPosition] = useState(1)

  const changeCurrentTime = (time) => videoRef.current.currentTime = time

  const changePlayPause = useCallback(({ isTwice = false } = {}) => {
    if (!videoRef.current) return
    if (isTwice) {
      const { duration } = videoRef.current
      const nextTime = duration * startPosition
      changeCurrentTime(nextTime)
    }
    const isPaused = videoRef.current.paused
    isPaused ? videoRef.current.play() : videoRef.current.pause()
    setIsPaused(isPaused)
  }, [startPosition])

  const changePosition = position => {
    const { duration } = videoRef.current
    const nextTime = duration * position

    changeCurrentTime(nextTime)

    setPosition(position)
  }

  const changeStartPosition = (nextPosition) => {
    if (nextPosition > position) {
      changePosition(nextPosition)
    }
    setStartPosition(nextPosition)
  }

  const changeEndPosition = (nextPosition) => {
    if (nextPosition < position) {
      changePosition(nextPosition)
    }
    setEndPosition(nextPosition)
  }

  const handleKeyUp = useCallback(({ keyCode }) => {  
    setLastKeyUp(last => {
      const now = Date.now()
      const isTwice = (now - last) < 500 

      if (keyCode === 32) changePlayPause({ isTwice })
      return now
    })

  }, [changePlayPause])

  useEffect(() => {
    getAudioBuffer(source, context)
      .then(buffer => {
        setVideoBuffer(buffer)
      })
  }, [context, source])

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])

  const videoOnTimeUpdate = () => {
    const { duration, currentTime } = videoRef.current
    const position = currentTime / duration
    
    if (position > endPosition) {
      changePosition(startPosition)
      return
    }

    setCurrentTime(currentTime)
    setPosition(position)
  }

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate
    setPlaybackRate(rate)
  }
  
  return {
    videoOnTimeUpdate,
    videoRef,
    videoBuffer,
    currentTime,
    changePlaybackRate,
    changePlayPause,
    changePosition,
    changeStartPosition,
    changeEndPosition,
    playbackRate,
    isPaused,
    position
  }

}