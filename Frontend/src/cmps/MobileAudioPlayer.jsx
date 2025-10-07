import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { getDuration, makeId } from '../services/util.service.js'
import { togglePlayerState, setPlayerTime, getPlayingSong, onPrevSong, onNextSong, setPlayerStation, setPlayingSong, setIsHost } from '../store/player.actions.js'
import SvgIcon from './SvgIcon.jsx'
import { socket } from '../services/socket.service.js'
import { eventBus } from '../services/event-bus.service.js'
import { throttle } from 'lodash'

export function MobileAudioPlayer() {
  const playerData = useSelector(state => state.playerModule.player)
  const station = useSelector(state => state.playerModule.station)
  const user = useSelector(state => state.userModule.user) // will be used for liked songs part

  const [jamRoomId, setJamRoomId] = useState(undefined)

  const initialState = {
    volume: 1,
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
    getPlayingSong()
  }, [playerData.currentSong.spotifyId])

  useEffect(() => {
    if (playerData.isHost) {
      socket.emit('player-state', {
        roomId: jamRoomId,
        state: {
          currentSong: playerData.currentSong,
          isPlaying: playerData.isPlaying,
          station: station
        }
      })
    }
  }, [playerData.currentSong, playerData.isPlaying, station])

  useEffect(() => {
    if (!playerData.isHost && jamRoomId) {
      const throttledHandler = throttle((state) => {
        console.log('Received state on client:', state)
        if (state.currentSong) setPlayingSong(state.currentSong) //currentSong change
        if (playerData.isPlaying !== state.isPlaying) togglePlayerState(state.isPlaying) //play/pause from host
        if (state.currentTime) setPlayerTime(state.currentTime) //if we have received a currentTime update (probably a timeline skip)
        if (playerRef.current) { //
          const desiredTime = state.currentTime * playerRef.current.duration
          if (Math.abs(playerRef.current.currentTime - desiredTime) > 0.5) {
            playerRef.current.currentTime = desiredTime
          }
        }
        if (state.currentSong.url !== playerData.currentSong.url) getPlayingSong(state.currentSong.spotifyId)// Handle song change, maybe unnecessary
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
    if (playerData.isHost) {
      socket.emit('player-state', {
        roomId: jamRoomId,
        state: {
          currentSong: playerData.currentSong,
          isPlaying: playerData.isPlaying,
          currentTime: parseFloat(inputTarget.value),
          station: station
        }
      })
    }
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
    console.log(station)
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

      <div className='mobile-audio-player-wrapper'>

        <div className='song-details-buttons-wrapper'>
          <div className='song-details-wrapper'>
            <img src={playerData.currentSong?.cover || 'https://res.cloudinary.com/dszyainah/image/upload/v1758998059/tqfjyzy4lhao3o1kwy6m.png'} />
            <div className='title-artists'>
              <h1>{playerData.currentSong?.name || playerData.currentSong?.songName || 'Play a song for details!'}</h1>
              <p>{playerData.currentSong ? (typeof (playerData.currentSong?.artists) === 'string' ? playerData.currentSong?.artists : playerData.currentSong?.artists?.join(', ')) : 'Play a song for details!'}</p>
            </div>
          </div>
          <div className='buttons-wrapper'>
            <button onClick={() => togglePlayerState(!playerData.isPlaying)} className='play-pause'>{playerData.isPlaying ? <SvgIcon iconName={"pauseSVG"} /> : <SvgIcon iconName={"playSVG"} />}</button>
          </div>
        </div>


        <div className='audio-player-buttons-wrapper'>


          <div className='timeline-wrapper'>
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
          </div>
        </div>
      </div>
    </div>
  )
}