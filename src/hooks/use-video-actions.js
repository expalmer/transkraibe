import { useRef, useState } from "react";

const videoInitialState = {
  time: 0,
  position: 0,
};

export const useVideoActions = () => {
  const videoRef = useRef();
  const [video, setVideo] = useState(videoInitialState);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(1);

  const setCurrentTime = (time) => (videoRef.current.currentTime = time);

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const videoOnTimeUpdate = () => {
    const { duration, currentTime } = videoRef.current;
    const position = currentTime / duration;

    if (position > endPosition) {
      changePosition(startPosition);
      return;
    }

    setVideo({
      time: currentTime,
      position,
    });
  };

  const changePosition = (nextPosition) => {
    const { duration } = videoRef.current;
    const nextTime = duration * nextPosition;

    if (nextPosition < startPosition) {
      return;
    }

    if (nextPosition > endPosition) {
      return;
    }

    setCurrentTime(nextTime);
    setVideo({
      time: nextTime,
      position: nextPosition,
    });
  };

  const changeStartPosition = (nextPosition) => {
    if (nextPosition > video.position) {
      changePosition(nextPosition);
    }
    setStartPosition(nextPosition);
  };

  const changeEndPosition = (nextPosition) => {
    if (nextPosition < video.position) {
      changePosition(nextPosition);
    }
    setEndPosition(nextPosition);
  };

  const resetVideoControls = () => {
    setVideo(videoInitialState);
    setPlaybackRate(1);
    setStartPosition(0);
    setEndPosition(1);
  };

  return {
    videoRef,
    playbackRate,
    changePlaybackRate,
    changePosition,
    changeStartPosition,
    changeEndPosition,
    videoOnTimeUpdate,
    time: video.time,
    position: video.position,
    startPosition,
    endPosition,
    resetVideoControls,
  };
};
