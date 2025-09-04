import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service.js'

export const playerService = {
    getCurrentSong,
    setCurrentSong,
}

const player = {}

const STORAGE_KEY = 'playerDB';


async function setCurrentSong(song) {

    try{
        player.currentSong = song
        saveToStorage(STORAGE_KEY, player)
    }

    catch (err) {
        console.log('PlayerService: there was an error setting current song:', err)
        throw err
    }

}



async function getCurrentSong(){

    try {
        const storedPlayer = loadFromStorage(STORAGE_KEY)
        return storedPlayer.currentSong
    }

    catch (err) {
        console.log('PlayerService: there was an error getting current song:', err)
        throw err
    }

}

/*

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
    console.log('new volume: ', inputVolume)
  }


  const togglePlay = () => {
    setState(prevState => ({...prevState, isPlaying: !state.isPlaying}))
    console.log('now playing ', url)
  }
  //-----------------------------------------------------------------------------------------------------------
  function setPlayerRef(player) {
    if (!player) return
    playerRef.current = player
  }

  function handleProgress() {
    const player = playerRef.current
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking || !player.buffered?.length) return


    setState(prevState => ({
      ...prevState,
      loadedSeconds: player.buffered?.end(player.buffered?.length - 1),
      loaded: player.buffered?.end(player.buffered?.length - 1) / player.duration,
    }))
  }


  function handleTimeUpdate() {
    const player = playerRef.current
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking) return

    console.log('onTimeUpdate', player.currentTime, playerRef.current.duration)

    if (!player.duration) return

    setState(prevState => ({
      ...prevState,
      playedSeconds: player.currentTime,
      played: player.currentTime / player.duration,
    }))
  }

  function handleSeekMouseDown() {
    setState(prevState => ({...prevState, seeking: true}))
  }

  function handleSeekChange(e) {
    const inputTarget = e.target
    setState(prevState => ({...prevState, played: parseFloat(inputTarget.value)}))
  }

  function handleSeekMouseUp(e) {
    const inputTarget = e.target
    setState(prevState => ({...prevState, seeking: false}))

    if (playerRef.current) {
    playerRef.current.currentTime =
      parseFloat(inputTarget.value) * playerRef.current.duration
    }
  }

  */