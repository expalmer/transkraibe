import { useState } from "react";

export const useVideoState = () => {
  const [isVideoLoaded, setVideoLoadedState] = useState(false);

  const resetVideoState = () => {
    setVideoLoadedState(false);
  };

  return {
    isVideoLoaded,
    resetVideoState,
    setVideoLoadedState,
  };
};
