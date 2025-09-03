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