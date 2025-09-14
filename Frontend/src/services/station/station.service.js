import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'
import { userService } from '../user/user.service.js'
import axios from 'axios';
import { addLikedStation } from '../../store/user.actions.js';
const BASE_URL = '//localhost:3000/api/station'

export const stationService = {
  query,
  get,
  loadStations,
  combineUserDefaultStations,
  editStation,
  addStation,
  setSpotifyStations,
  getSpotifyStationSongsById,
}


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
  const storedStations = await axios.get(BASE_URL)
  return storedStations.data
}

async function get(stationId) {
  const station = await axios.get(`${BASE_URL}/${stationId}`)
  console.log('got station: ', station.data)
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
    //station.
    const editedStation = await axios.put(BASE_URL, station)
    return editedStation.data
  } catch (err) {
    console.log('StationService: There was an error trying to edit station ', err)
    throw err
  }
}

async function addStation(user) {
  try {
    const station = {
      index: 5,
      addedBy: user.name
    }
    const addedStation = await axios.post(BASE_URL, station)
    await addLikedStation(user, addedStation.data)
    return 'Added station successfully!'
  } catch (err) {
    console.log('StationService: There was an error trying to add station ', err)
    throw err
  }
}

export function makeNewPlaylistCover(songs) {
  try {
    if (!songs.length) return "https://www.vicentenews.com/wp-content/uploads/2024/08/DJ-Maphorisa-Kabza-De-Small-OSKIDO-Afro-Wave-feat.-Olodum-Tman-Xpress-Phila-Dlozi.png"
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

async function setSpotifyStations(genre){
  try{
    const spotifyStations = await axios.get(`http://localhost:3000/api/sy/stations`, {params: {genre: genre}})
    return spotifyStations.data
  } catch (err) {
    console.log('StationService: There was an error retrieveing spotify default stations, ', err)
    throw err
  }
}

async function getSpotifyStationSongsById(playlist) {
  try{
    const playlistSongs = await axios.get(`//localhost:3000/api/sy/playlist`, {params: {playlistId: playlist.spotifyApiId}})
    playlist.songs = playlistSongs.data
    await axios.post(BASE_URL, playlist)
    return playlist
  } catch(err) {
    console.log('StationService: Could not get or append playlist songs to the playlist, ',err)
    throw err
  }
}