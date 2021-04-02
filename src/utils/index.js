export const createAudioContext = () => {
  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext;
  return new AudioContext();
};

export const getAudioBuffer = async (path) => {
  const audioContext = createAudioContext();
  const response = await fetch(path);
  const audioData = await response.arrayBuffer();
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(audioData, (buffer) => {
      return resolve(buffer);
    });
  });
};

export const getPosition = (track, pointer) => {
  const left1 = track.getBoundingClientRect().left;
  const left2 = pointer.getBoundingClientRect().left;
  return left2 - left1;
};
