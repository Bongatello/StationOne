import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'

export function AudioPlayer({url}) {
  const station = useSelector(state => state.stationsModule.stations)
  const currentlyData = useSelector(state => state.currentlyModule.currently)


  const playerRef = useRef(null)
  const lastVolume = useRef(0.5)

  const [isPlaying, setIsPlaying] = useState(false)
  const [userVolume, setUserVolume] = useState(0.5)


  const svgProps = {height:"16px", width:"16px", viewBox:"0 0 16 16"}

  const nextPrevSVG = <svg {...svgProps}><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"/></svg>
  const pauseSVG = <svg {...svgProps}><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"/></svg> 
  const playSVG = <svg {...svgProps}><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/></svg>
  const muteSVG = <svg {...svgProps}><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a3 3 0 0 1 0 5.175z"/></svg>
  const unmuteSVG = <svg {...svgProps}><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06"/><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.64 3.64 0 0 0-1.33 4.967 3.64 3.64 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.7 4.7 0 0 1-1.5-.694v1.3L2.817 9.852a2.14 2.14 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694z"/></svg>



  function toggleMute(){
    if (userVolume===0){ //muted state
      setUserVolume(lastVolume.current)
      console.log('unmuted player, volume: ', userVolume)
    }
    else { //unmuted state
      lastVolume.current = userVolume
      setUserVolume(0)
      console.log('muted player, volume: ', userVolume)
    }
  }

  function handleInputVolume (inputVolume) {
    setUserVolume(inputVolume)
    console.log('new volume: ', inputVolume)
  }

  function handleSeekChange (inputSeek) {
    
  }


  const togglePlay = () => {
    setIsPlaying(prev => !prev)
    console.log('now playing ', url)
  }

  const handleSeekForward = () => {
    const currentTime = playerRef.current.getCurrentTime()
    playerRef.current.seekTo(currentTime + 10, 'seconds')
  }

  const handleSeekBackward = () => {
    const currentTime = playerRef.current.getCurrentTime()
    playerRef.current.seekTo(currentTime - 10, 'seconds')
  }



  if (!currentlyData.currentSong) {
    return <div>Loading Player...</div>
  }
  return (
    <div>
      {/* Hidden Player */}
      <div style={{display:'none'}}>
        <ReactPlayer
          ref={playerRef}
          src={currentlyData.currentSong}
          playing={isPlaying}
          volume={userVolume}
          controls={false}
          width="0px"
          height="0px"
        />
      </div>

      {/* Custom Controls */}
      <div className='audio-player-wrapper'>

        <div className='song-details-wrapper'>
          <p>img src=song.imgUrl</p>

          <div className='title-artists'>
            <h1>song.title</h1>
            <p>song.title</p>
          </div>
        </div>


        <div className='audio-player-buttons-wrapper'>
          <div className='buttons-wrapper'>
            <button onClick={handleSeekBackward} className='prev-song'>{nextPrevSVG}</button>
            <button onClick={togglePlay} className='play-pause'>{isPlaying ? pauseSVG : playSVG}</button>
            <button onClick={handleSeekForward} className='next-song'>{nextPrevSVG}</button>
          </div>
          <div className='timeline-wrapper'>
            <p>0:00</p>
            <input type="range" min={0} max={0.999999} step={"any"}></input>
            <p>song.length</p>
          </div>
        </div>


        <div className='audio-player-volume'>
          <button onClick={toggleMute} className='mute-button'>{userVolume ? muteSVG : unmuteSVG}</button>
          <input type="range" min={0} max={1} step={"any"} value={userVolume} onChange={(e) => handleInputVolume(parseFloat(e.target.value))}></input>
        </div>
      </div>
    </div>
  )
}
