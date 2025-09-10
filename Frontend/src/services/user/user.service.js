import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'
import Axios from 'axios'

export const userService = {
    addStation,
    loadUserData,
    addToLikedStations,
    removeFromLikedStations,
    editLikedStation,
}

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3000/api/user'
const STORAGE_KEY = "userDB"

async function getEmptyStation(index){
    const newStation = {
      index: index,
      addedBy: 'Default User',
    }
    return newStation
}


async function addStation() {
	const newIndex = user.createdStationsCount + 1
	const myNewStation = await getEmptyStation(newIndex)

  const newStation = await axios.post(BASE_URL, myNewStation)

	storedUser.createdStationsCount = newIndex
	storedUser.likedStations.unshift(newStation.data)

	saveToStorage(STORAGE_KEY, storedUser)
	return storedUser
}


async function loadUserData(userId) {
  const user = await axios.get(`${BASE_URL}/${userId}`)
  return user.data
}


async function addToLikedStations(user, station) {
    const {_id, name, addedBy, thumbnail} = station
    const miniStation = {_id, name, addedBy, thumbnail}

    const userToEdit = {
      _id: user._id,
      likedStations: user.likedStations
    }
    userToEdit.likedStations.unshift(miniStation)

    await axios.put(BASE_URL, userToEdit)
	return 'Station added to user liked stations!'
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

async function editLikedStation(userId, station) {
  try{
    const reqBody = {userId, station}
    const editedStation = await axios.put(BASE_URL, reqBody)
    return editedStation.data
  } catch(err) {
    console.log('UserService: Requested liked station could not be edited, ', err)
    throw err
  }
}