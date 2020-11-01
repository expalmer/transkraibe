export const getAudioBuffer = async (path, context) => {
  const response = await fetch(path);
  const audioData = await response.arrayBuffer();
  return new Promise((resolve, reject) => {
    context.decodeAudioData(audioData, buffer => {
      return resolve(buffer);
    });
  });
};

export const getContext = () => {
  window.AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext;
  const context = new AudioContext();
  return context;
};

export const getNextTime = (duration, position) => {
  return duration * position
}

export const getPosition = (track, pointer) => {
  const left1 = track.getBoundingClientRect().left
  const left2 = pointer.getBoundingClientRect().left
  return left2 - left1
}

export const getDragNextTime = (clientWidth, position, duration) => {
  const pos = 1 / clientWidth * position
  return getNextTime(duration, pos)
}

export const formatTime = (time = 0) => {
  return Number(time).toFixed(2)
}