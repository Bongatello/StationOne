import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'
import { userService } from '../user/user.service.js'
import axios from 'axios';

const BASE_URL = '//localhost:3000/api/station'

export const stationService = {
  query,
  get,
  loadStations,
  combineUserDefaultStations,
  editStation,
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
    const editedStation = await axios.put(BASE_URL, station)
    return editedStation.data
  } catch (err) {
    console.log('StationService: There was an error trying to edit station ', err)
    throw err
  }
}
