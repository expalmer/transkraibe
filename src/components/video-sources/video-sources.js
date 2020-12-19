import './video-sources.css'

export const VideoSources = ({ currentVideo, videos, handleSelectVideo }) => {

  const handleSelect = (e) => {
    const { value } = e.target
    if (!value) return
    const video = videos.find(x => x.name === value)
    handleSelectVideo(video.source)
  }

  return (
    <div className="video-sources">
      <select className="video-sources__select" onChange={handleSelect}>
        <option value="">-</option>
        {videos.map(({ name }) => <option key={name} value={name}>{name}</option>)}
      </select>
    </div>
  )
}