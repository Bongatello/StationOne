import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

export default function AudioPlayer() {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  const handleSeekForward = () => {
    const currentTime = playerRef.current.getCurrentTime()
    playerRef.current.seekTo(currentTime + 10, 'seconds')
  }

  const handleSeekBackward = () => {
    const currentTime = playerRef.current.getCurrentTime()
    playerRef.current.seekTo(currentTime - 10, 'seconds')
  }

  return (
    <div>
      {/* Hidden Player */}
      <div style={{ display: 'none' }}>
        <ReactPlayer
          ref={playerRef}
          url="https://example.com/audio.mp3" // or a YouTube/SoundCloud link
          playing={isPlaying}
          controls={false}
          width="0"
          height="0"
        />
      </div>

      {/* Custom Controls */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleSeekBackward}>⏪ 10s</button>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleSeekForward}>⏩ 10s</button>
      </div>
    </div>
  )
}