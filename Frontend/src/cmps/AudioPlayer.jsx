import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { getDuration } from '../services/util.service'
import { togglePlayerState, setPlayerTime, getPlayingSong, onPrevSong, onNextSong } from '../store/player.actions'

export function AudioPlayer() {
  const playerData = useSelector(state => state.playerModule.player)
  const station = useSelector(state => state.playerModule.station)

  const initialState = {
    volume: 0.5,
    muted: false,
    seeking: false,
  }

  const initialRef = {
    currentTime: 0,
    duration: 0
  }

  const [state, setState] = useState(initialState);
  const playerRef = useRef(initialRef)

  useEffect(() => {
    getPlayingSong()
    console.log('loaded song: ', playerData.currentSong.url)
  }, [playerData.currentSong._id])

  const svgProps = { height: "16px", width: "16px", viewBox: "0 0 16 16" }

  const nextPrevSVG = <svg {...svgProps}><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z" /></svg>
  const pauseSVG = <svg {...svgProps}><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" /></svg>
  const playSVG = <svg {...svgProps}><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" /></svg>
  const muteSVG = <svg {...svgProps}><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a3 3 0 0 1 0 5.175z" /></svg>
  const unmuteSVG = <svg {...svgProps}><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06" /><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.64 3.64 0 0 0-1.33 4.967 3.64 3.64 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.7 4.7 0 0 1-1.5-.694v1.3L2.817 9.852a2.14 2.14 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694z" /></svg>

  function toggleMute() {
    if (state.muted) { //muted state
      setState(prevState => ({...prevState, muted: false}))
      console.log('unmuted player, volume: ', state.volume)
    }
    else { //unmuted state
      setState(prevState => ({...prevState, muted: true}))
      console.log('muted player, volume: ', state.volume)
    }
  }

  function handleInputVolume(inputVolume) {
    setState(prevState => ({...prevState, volume: inputVolume}))
  }


  function togglePlay() {
    togglePlayerState(!playerData.isPlaying)
  }
  //-----------------------------------------------------------------------------------------------------------
  function setPlayerRef(player) {
    if (!player) return
    playerRef.current = player
  }

  function handleTimeUpdate() {
    const player = playerRef.current
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking) return
    if (!player.duration) return
    const played = player.currentTime/player.duration
    setPlayerTime(played)
  }

  function handleSeekMouseDown() {
    setState(prevState => ({...prevState, seeking: true}))
  }

  function handleSeekChange(e) {
    const inputTarget = e.target
    setPlayerTime(parseFloat(inputTarget.value))
  }

  function handleSeekMouseUp(e) {
    const inputTarget = e.target
    setState(prevState => ({...prevState, seeking: false}))

    if (playerRef.current) {
    playerRef.current.currentTime =
      parseFloat(inputTarget.value) * playerRef.current.duration
    }
  }

  async function getNextSong() {
    await onNextSong(station, playerData.currentSong._id)
  }

  async function getPrevSong() {
    await onPrevSong(station, playerData.currentSong._id)
  }

  async function handleEnded() {
    await getNextSong()
  }


  if (!playerData.currentSong.url) {
    return <div>Loading Player...</div>
  }
  return (
    <div>
      {/* Hidden Player */}
      <div style={{ display: 'none' }}>
        <ReactPlayer
          ref={setPlayerRef}
          src={playerData.currentSong.url}
          playing={playerData.isPlaying}
          volume={state.volume}
          onTimeUpdate={handleTimeUpdate}
          onReady={() => console.log('onReady')}
          onEnded={handleEnded}
          controls={false}
          muted={state.muted}
          width="0px"
          height="0px"
        />
      </div>

      {/* Custom Controls */}
      <div className='audio-player-wrapper'>

        <div className='song-details-wrapper'>
          <img src={playerData.currentSong.cover} />

          <div className='title-artists'>
            <h1>{playerData.currentSong.name}</h1>
            <p>{playerData.currentSong.artists}</p>
          </div>
        </div>


        <div className='audio-player-buttons-wrapper'>
          <div className='buttons-wrapper'>
            <button onClick={getPrevSong} className='prev-song'>{nextPrevSVG}</button>
            <button onClick={() => togglePlayerState(!playerData.isPlaying)} className='play-pause'>{playerData.isPlaying ? pauseSVG : playSVG}</button>
            <button onClick={getNextSong} className='next-song'>{nextPrevSVG}</button>
          </div>


          <div className='timeline-wrapper'>
            <p>{getDuration('seconds', Math.floor(playerRef.current.currentTime))}</p>
            <input
              type="range"
              min={0}
              max={0.999999}
              step={"any"}
              value={playerData.currentTime}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            ></input>
            <p>{getDuration('seconds', playerRef.current.duration)}</p>
          </div>
        </div>


        <div className='audio-player-volume'>
          <button onClick={toggleMute} className='mute-button'>{state.muted ? unmuteSVG : muteSVG}</button>
          <input type="range" min={0} max={1} step={"any"} value={state.volume} onChange={(e) => handleInputVolume(parseFloat(e.target.value))}></input>
        </div>
      </div>
    </div>
  )
}
