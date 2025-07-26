import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'

export const userService = {
    addStation,
    loadUserData,
    addToLikedStations,
    removeFromLikedStations,
}


const STORAGE_KEY = "userDB"

export const user = {
    pfp: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
    likedSongs: ['v1w2x'],
    likedStations: [],
    recentStations: ['b2c3d'],
    createdStationsCount: 1,
}

function getEmptyStation(index){
    const newStation = {
      _id: makeId(5),
      name: `My Station #${index}`,
      tags: [],
      addedBy: 'Default User',
      thumbnail: 'https://www.vicentenews.com/wp-content/uploads/2024/08/DJ-Maphorisa-Kabza-De-Small-OSKIDO-Afro-Wave-feat.-Olodum-Tman-Xpress-Phila-Dlozi.png',
      songs: [],
    }
    return newStation
}


function addStation() {
	let storedUser = loadFromStorage(STORAGE_KEY)

	
	if (!storedUser) {
		storedUser = { ...user }
		saveToStorage(STORAGE_KEY, storedUser)
	}

	if (!Array.isArray(storedUser.likedStations)) {
		storedUser.likedStations = []
	}

	const newIndex = storedUser.createdPlaylistsCount + 1
	const myNewStation = getEmptyStation(newIndex)

	storedUser.createdPlaylistsCount = newIndex
	storedUser.likedStations.unshift(myNewStation)

	saveToStorage(STORAGE_KEY, storedUser)
	return storedUser
}


function loadUserData() {
	let storedUser = loadFromStorage(STORAGE_KEY)

	
	if (!storedUser) {
		storedUser = { ...user }
		saveToStorage(STORAGE_KEY, storedUser)
	}

	return storedUser
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