export const Video = ({ customRef, onTimeUpdate, source }) => (
  <div className="video box">
    <video ref={customRef} onTimeUpdate={onTimeUpdate} controls>
      <source src={source} type="video/mp4" />
    </video>
  </div>
)