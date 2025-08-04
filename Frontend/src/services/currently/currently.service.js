import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'

export const currentlyService = {
    getCurrentSong,
    setCurrentSong,
}

const currently = {}

const STORAGE_KEY = 'currentlyDB';


async function setCurrentSong(songUrl) {

    try{
        currently.currentSong = songUrl
        saveToStorage(STORAGE_KEY, currently)
    }

    catch (err) {
        console.log('CurrentlyService: there was an error setting current song:', err)
        throw err
    }

}



async function getCurrentSong(){

    try {
        const storedCurrently = loadFromStorage(STORAGE_KEY)
        return storedCurrently.currentSong
    }

    catch (err) {
        console.log('CurrentlyService: there was an error getting current song:', err)
        throw err
    }

}