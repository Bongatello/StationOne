import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'
import Axios from 'axios'

export const userService = {
    addStation,
    loadUserData,
    addToLikedStations,
    removeFromLikedStations,
}

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3000/api/station'


const STORAGE_KEY = "userDB"

export const user = {
    pfp: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
    likedSongs: ['v1w2x'],
    likedStations: [],
    recentStations: ['b2c3d'],
    createdStationsCount: 0,
}

async function getEmptyStation(index){
    const newStation = {
      index: index,
      addedBy: 'Default User',
    }
    return newStation
}


async function addStation() {
	let storedUser = await loadFromStorage(STORAGE_KEY)

	
	if (!storedUser) {
		storedUser = { ...user }
		saveToStorage(STORAGE_KEY, storedUser)
	}

	const newIndex = storedUser.createdStationsCount + 1
	const myNewStation = await getEmptyStation(newIndex)

  const newStation = await axios.post(BASE_URL, myNewStation)

	storedUser.createdStationsCount = newIndex
	storedUser.likedStations.unshift(newStation.data)

	saveToStorage(STORAGE_KEY, storedUser)
	return storedUser
}


async function loadUserData() {
	 let storedUser = loadFromStorage(STORAGE_KEY)

	
	if (!storedUser) {
		storedUser = { ...user }

    const stations = await axios.get(BASE_URL)
    if (!stations) stations = []

    storedUser.likedStations = stations.data
		saveToStorage(STORAGE_KEY, storedUser)
	}

	return storedUser 

  const stations = await axios.get(BASE_URL)

  if (!stations) stations = []
  
  return stations.data


}


function addToLikedStations(station) {

    const storedUser = loadFromStorage(STORAGE_KEY)

    storedUser.likedStations.unshift(station)

	saveToStorage(STORAGE_KEY, storedUser)
	return storedUser

}

function removeFromLikedStations(station) {

  const storedUser = loadFromStorage(STORAGE_KEY)

  const index = storedUser.likedStations.findIndex(likedStation => likedStation._id === station._id)

  if (index !== -1) {
    storedUser.likedStations.splice(index, 1)
  }

  saveToStorage(STORAGE_KEY, storedUser)
  return storedUser

}