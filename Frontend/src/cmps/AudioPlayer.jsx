import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { getDuration } from '../services/util.service'
import { togglePlayerState, setPlayerTime, getPlayingSong, onPrevSong, onNextSong } from '../store/player.actions'
import SvgIcon from './SvgIcon'

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
            <button onClick={getPrevSong} className='prev-song'><SvgIcon iconName={"nextPrevSVG"} /></button>
            <button onClick={() => togglePlayerState(!playerData.isPlaying)} className='play-pause'>{playerData.isPlaying ? <SvgIcon iconName={"pauseSVG"} /> : <SvgIcon iconName={"playSVG"} />}</button>
            <button onClick={getNextSong} className='next-song'><SvgIcon iconName={"nextPrevSVG"} /></button>
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
            <p>{playerRef.current.duration? getDuration('seconds', playerRef.current.duration) : getDuration('ms', playerData.currentSong.durationMs)}</p>
          </div>
        </div>


        <div className='audio-player-volume'>
          <button onClick={toggleMute} className='mute-button'>{state.muted ? <SvgIcon iconName={"unmuteSVG"} /> : <SvgIcon iconName={"muteSVG"} />}</button>
          <input type="range" min={0} max={1} step={"any"} value={state.volume} onChange={(e) => handleInputVolume(parseFloat(e.target.value))}></input>
        </div>
      </div>
    </div>
  )
}
