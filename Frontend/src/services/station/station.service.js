import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'
import { userService } from '../user/user.service.js'
import axios from 'axios';
import { addLikedStation } from '../../store/user.actions.js';
import { setSelectedStation } from '../../store/station.actions.js';

export const stationService = {
  query,
  get,
  loadStations,
  combineUserDefaultStations,
  editStation,
  addStation,
  setSpotifyStations,
  addExistingStation,
}
const BASE_URL = import.meta.env.VITE_API_URL || '//localhost:3000'
const USER_URL = `${BASE_URL}/api/station`
const STORAGE_KEY = 'stationsDB';

function query(filterBy = {}) {

  if (!stations || !stations.length) {
    saveToStorage(STORAGE_KEY, stations)
    return stations
  }

  return storageService.query(STORAGE_KEY).then(stations => {
    if (!filterBy.txt) return stations

    const regExp = new RegExp(filterBy.txt, 'i')
    return stations.filter(station =>
      station.tags.some(tag => regExp.test(tag))
    )
  })
}

async function loadStations() {
  const storedStations = await axios.get(USER_URL)
  return storedStations.data
}

async function get(stationId) {
  const station = await axios.get(`${USER_URL}/${stationId}`)
  return station.data
}


async function combineUserDefaultStations() {
  const userStations = await userService.loadUserData()

  const currentStationList = await loadStations()

  const mergedStations = [...currentStationList]

  userStations.likedStations.forEach(userStation => {
    const exists = currentStationList.some(station => station._id === userStation._id)
    if (!exists) mergedStations.push(userStation)
  })

  saveToStorage(STORAGE_KEY, mergedStations)
  console.log('Station Service: Successfully combined stations')
  return mergedStations
}

async function editStation(station) {
  try {
    const editedStation = await axios.put(USER_URL, station)
    return editedStation.data
  } catch (err) {
    console.log('StationService: There was an error trying to edit station ', err)
    throw err
  }
}

async function addStation(user) {
  try {
    var userStationsCount = 1
    user.likedStations.forEach(station => {
      if (station.addedBy === user.name) userStationsCount++
    })
    const station = {
      index: userStationsCount,
      addedBy: user.name
    }
    const addedStation = await axios.post(USER_URL, station)
    await addLikedStation(user, addedStation.data)
    return 'Added station successfully!'
  } catch (err) {
    console.log('StationService: There was an error trying to add station ', err)
    throw err
  }
}

export function makeNewPlaylistCover(songs) {
  try {
    if (songs.length<1) return null
    if (songs.length > 0 && songs.length <= 3) return songs[0].cover
    /*     if (songs.length>3) {
          return {
            imageTL: songs[0].cover,
            imageTR: songs[1].cover,
            imageBL: songs[2].cover,
            imageBR: songs[3].cover
          }
        } */
    return
  } catch (err) {
    console.log('StationService: Could not make a new playlist cover. ', err)
    throw err
  }
}

async function setSpotifyStations(genre) {
  try {
    const spotifyStations = await axios.get(`http://localhost:3000/api/sy/stations`, { params: { genre: genre } })
    return spotifyStations.data
  } catch (err) {
    console.log('StationService: There was an error retrieveing spotify default stations, ', err)
    throw err
  }
}

/* async function getSpotifyStationSongsById(playlist) {
  try {
    const playlistSongs = await axios.get(`//localhost:3000/api/sy/playlist`, { params: { playlistId: playlist.spotifyApiId } })
    playlist.songs = playlistSongs.data
    await axios.post(USER_URL, playlist)
    return playlist
  } catch (err) {
    console.log('StationService: Could not get or append playlist songs to the playlist, ', err)
    throw err
  }
} */

async function addExistingStation(stationId) {
  try {
    const stationToAdd = await axios.get(`http://localhost:3000/api/sy/playlist`, { params: { playlistId: stationId } })
    await axios.post(USER_URL, stationToAdd.data)
    setSelectedStation(stationId)
  } catch (err) {
    console.log('StationService: Could not add existing station to DB, ', err)
    throw err
  }
}