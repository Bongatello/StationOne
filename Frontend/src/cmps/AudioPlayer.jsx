import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { getDuration, makeId } from '../services/util.service'
import { togglePlayerState, setPlayerTime, getPlayingSong, onPrevSong, onNextSong, setPlayerStation, setPlayingSong, setIsHost } from '../store/player.actions'
import SvgIcon from './SvgIcon'
import { socket } from '../services/socket.service.js'
import { eventBus } from '../services/event-bus.service.js'
import { throttle } from 'lodash'

export function AudioPlayer() {
  const playerData = useSelector(state => state.playerModule.player)
  const station = useSelector(state => state.playerModule.station)
  const user = useSelector(state => state.userModule.user)

  const [jamRoomId, setJamRoomId] = useState(undefined)

  const initialState = {
    volume: 0.5,
    muted: false,
    seeking: false,
  }

  const initialRef = {
    currentTime: 0,
    duration: 0
  }

  const [state, setState] = useState(initialState)
  const playerRef = useRef(initialRef)

  useEffect(() => {
    if (playerData.isHost) {
      getPlayingSong()
    }
  }, [playerData.currentSong.spotifyId])

  useEffect(() => {
    if (playerData.isHost) {
      socket.emit('player-state', {
        roomId: jamRoomId,
        state: {
          currentSong: playerData.currentSong,
          isPlaying: playerData.isPlaying,
          currentTime: playerData.currentTime,
          station: station
        }
      })
    }
  }, [playerData.currentSong, playerData.isPlaying, playerData.currentTime, station])

  useEffect(() => {
  if (!playerData.isHost) {
    // Create a throttled version of the handler
    const throttledHandler = throttle((state) => {
      console.log('Received state on client:', state)
      setPlayingSong(state.currentSong)
      
      if (playerData.isPlaying !== state.isPlaying) {
        togglePlayerState(state.isPlaying)
      }

      setPlayerTime(state.currentTime)

      if (playerRef.current) {
        const desiredTime = state.currentTime * playerRef.current.duration
        if (Math.abs(playerRef.current.currentTime - desiredTime) > 0.5) {
          playerRef.current.currentTime = desiredTime
        }
      }

      // Handle song change
      if (state.currentSong.url !== playerData.currentSong.url) {
        getPlayingSong(state.currentSong.spotifyId)
      }
    }, 500) // Throttle to once every 500ms

    socket.on('player-state', throttledHandler)

    return () => {
      socket.off('player-state', throttledHandler)
      throttledHandler.cancel() // Clean up throttled function
    }
  }
}, [playerData])

  function handleJoinJamModal() {
    eventBus.emit('show-modal', { type: 'join-jam', content: 'join-jam' })
  }

  function createJamRoom() {
    if (!playerData.isHost) {
      const roomId = makeId(5)
      socket.emit('join-room', roomId)
      setJamRoomId(roomId)
      setIsHost(true)
    }
    if (playerData.isHost) {
      setJamRoomId(undefined)
      setIsHost(false)
    }
  }

  function toggleMute() {
    if (state.muted) { //muted state
      setState(prevState => ({ ...prevState, muted: false }))
      console.log('unmuted player, volume: ', state.volume)
    }
    else { //unmuted state
      setState(prevState => ({ ...prevState, muted: true }))
      console.log('muted player, volume: ', state.volume)
    }
  }

  function handleInputVolume(inputVolume) {
    setState(prevState => ({ ...prevState, volume: inputVolume }))
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
    const played = player.currentTime / player.duration
    setPlayerTime(played)
  }

  function handleSeekMouseDown() {
    setState(prevState => ({ ...prevState, seeking: true }))
  }

  function handleSeekChange(e) {
    const inputTarget = e.target
    setPlayerTime(parseFloat(inputTarget.value))
  }

  function handleSeekMouseUp(e) {
    const inputTarget = e.target
    setState(prevState => ({ ...prevState, seeking: false }))

    if (playerRef.current) {
      playerRef.current.currentTime =
        parseFloat(inputTarget.value) * playerRef.current.duration
    }
  }

  async function getNextSong() {
    await onNextSong(station, playerData.currentSong.spotifyId)
  }

  async function getPrevSong() {
    await onPrevSong(station, playerData.currentSong.spotifyId)
  }

  async function handleEnded() {
    await getNextSong()
  }


  
  return (
    <div>
      <div style={{ display: 'none' }}>
        <ReactPlayer
          ref={setPlayerRef}
          src={playerData.currentSong?.url}
          playing={playerData.isPlaying}
          volume={state.volume}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          controls={false}
          muted={state.muted}
          width="0px"
          height="0px"
        />
      </div>
      <div className='audio-player-wrapper'>

        <div className='song-details-wrapper'>
          <img src={playerData.currentSong?.cover || 'https://res.cloudinary.com/dszyainah/image/upload/v1758998059/tqfjyzy4lhao3o1kwy6m.png'} />

          <div className='title-artists'>
            <h1>{playerData.currentSong?.name || playerData.currentSong?.songName || 'Play a song for details!'}</h1>
            <p>{playerData.currentSong? (typeof (playerData.currentSong?.artists) === 'string' ? playerData.currentSong?.artists : playerData.currentSong?.artists?.join(', ')) : 'Play a song for details!'}</p>
          </div>
        </div>


        <div className='audio-player-buttons-wrapper'>
          <div className='buttons-wrapper'>
            <button onClick={() => getPrevSong()} className='prev-song'><SvgIcon iconName={"nextPrevSVG"} /></button>
            <button onClick={() => togglePlayerState(!playerData.isPlaying)} className='play-pause'>{playerData.isPlaying ? <SvgIcon iconName={"pauseSVG"} /> : <SvgIcon iconName={"playSVG"} />}</button>
            <button onClick={() => getNextSong()} className='next-song'><SvgIcon iconName={"nextPrevSVG"} /></button>
          </div>


          <div className='timeline-wrapper'>
            <p>{playerRef.current?.currentTime ? getDuration('seconds', Math.floor(playerRef.current.currentTime)) : '0:00'}</p>
            <input
              type="range"
              className='timeline-bar'
              min={0}
              max={0.999999}
              step={"any"}
              value={playerData.currentTime}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              style={{
                "--progress": `${playerData.currentTime * 100}%`,
              }}
            />
            <p>{playerRef.current?.duration ? getDuration('seconds', playerRef.current?.duration) : getDuration('ms', playerData.currentSong?.durationMs)}</p>
          </div>
        </div>


        <div className='audio-player-volume'>
          <div className='invite-collaborators-wrapper' onClick={() => createJamRoom()}>
            <SvgIcon iconName={"connectToDevice"} className={"connect-to-device"} />
          </div>
          {playerData.isHost && <p>{jamRoomId}</p>}
          {!playerData.isHost && <p onClick={() => handleJoinJamModal()}>Join a Jam</p>}
          <button onClick={() => toggleMute()} className='mute-button'>{state.muted ? <SvgIcon iconName={"unmuteSVG"} /> : <SvgIcon iconName={"muteSVG"} />}</button>
          <input type="range"
            className='volume-bar'
            min={0}
            max={1}
            step={"any"}
            value={state.volume}
            onChange={(e) => handleInputVolume(parseFloat(e.target.value))}
            style={{
              "--progress": `${state.volume * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}