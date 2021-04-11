import { useRef } from "react";
import Draggable from "react-draggable";

import "./video-markers.css";

export const getPosition = (track, pointer) => {
  const left1 = track.getBoundingClientRect().left;
  const left2 = pointer.getBoundingClientRect().left;
  return left2 - left1;
};

export const VideoMarkers = ({
  startPosition,
  endPosition,
  changeStartPosition = () => {},
  changeEndPosition = () => {},
}) => {
  const trackRef = useRef();
  const startRef = useRef();
  const endRef = useRef();

  const dragStartHandlers = {
    onStop: () => {
      const width = getPosition(trackRef.current, startRef.current);
      const nextPosition = width / trackRef.current.clientWidth;
      changeStartPosition(nextPosition);
    },
  };

  const dragEndHandlers = {
    onStop: () => {
      const width = getPosition(trackRef.current, endRef.current);
      const nextPosition = width / trackRef.current.clientWidth;
      changeEndPosition(nextPosition);
    },
  };

  return (
    <div className="video-markers" ref={trackRef}>
      <Draggable axis="x" {...dragStartHandlers} bounds={"parent"}>
        <div className="video-markers__start" ref={startRef}></div>
      </Draggable>
      <Draggable axis="x" {...dragEndHandlers} bounds={"parent"}>
        <div className="video-markers__end" ref={endRef}></div>
      </Draggable>
    </div>
  );
};
