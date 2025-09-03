import { store } from './store.js'
import { playerService } from '../services/player/player.service.js'
import { SET_CURRENT_SONG, GET_CURRENT_SONG } from './player.reducer.js'


export async function getPlayingSong() {
    try{
        const song = await playerService.getCurrentSong()
        store.dispatch(getCmdGetCurrentSong(song))
        console.log('PlayerActions: successfully loaded song')
    }
    catch (err) {
        console.log('PlayerActions: unable to load song', err)
        throw err
    }
}

export async function setPlayingSong(song) {
    try{
        await playerService.setCurrentSong(song)
        store.dispatch(getCmdSetCurrentSong(song))
        console.log('PlayerActions: successfully set current song')
    }
    catch (err) {
        console.log('PlayerActions: unable to set current song', err)
        throw err
    }
}


// Command Creators:

function getCmdGetCurrentSong(song) {
    return {
        type: GET_CURRENT_SONG,
        song
    }
}

function getCmdSetCurrentSong(song) {
    return {
        type: SET_CURRENT_SONG,
        song
    }
}