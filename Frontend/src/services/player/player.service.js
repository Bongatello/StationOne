import { storageService } from '../async-storage.service.js'
import { findOnYoutube } from '../songs/songs.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service.js'

export const playerService = {
  getCurrentSong,
  setCurrentSong,
  getPrevNextSong,
}

const player = {}

const STORAGE_KEY = 'playerDB'


async function setCurrentSong(song) {

  try {
    player.currentSong = song
    saveToStorage(STORAGE_KEY, player)
  } catch (err) {
    console.log('PlayerService: there was an error setting current song:', err)
    throw err
  }

}


async function getCurrentSong() {

  try {
    const storedPlayer = loadFromStorage(STORAGE_KEY)
    return storedPlayer.currentSong
  } catch (err) {
    console.log('PlayerService: there was an error getting current song:', err)
    throw err
  }

}


async function getPrevNextSong(prevNext, station, currSongId) {
  try {
    var prevNextIdx
    const currentIdx = station.songs.findIndex(song => song._id === currSongId)
    if (currentIdx === -1) throw 'playerService.getPrevNextSong: Couldnt find current song by ID'
    if (prevNext === 'next') prevNextIdx = currentIdx + 1
    if (prevNext === 'prev') prevNextIdx = currentIdx - 1
    if (prevNextIdx >= 0 && prevNextIdx < station.songs.length) {
      const prevNextSong = station.songs[prevNextIdx]
      prevNextSong.url = await findOnYoutube(prevNextSong)
      return prevNextSong
    }
    if (prevNextIdx >= station.songs.length) {
      const prevNextSong = station.songs[0]
      prevNextSong.url = await findOnYoutube(prevNextSong)
      return prevNextSong
    }
    if (prevNextIdx < 0) {
      const prevNextSong = station.songs[station.songs.length - 1]
      prevNextSong.url = await findOnYoutube(prevNextSong)
      return prevNextSong
    }
    throw 'playerService.getPrevNextSong: Unable to find prev song'
  } catch (err) {
    console.log('PlayerService: There was an error getting previous or next song, ', err)
    throw err
  }
}