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
  return new AudioContext();
};


export const getPosition = (track, pointer) => {
  const left1 = track.getBoundingClientRect().left
  const left2 = pointer.getBoundingClientRect().left
  return left2 - left1
}
