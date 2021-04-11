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
    audioContext.decodeAudioData(
      audioData,
      (buffer) => {
        resolve(buffer);
      },
      (err) => {
        reject(err);
      }
    );
  });
};
