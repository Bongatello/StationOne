import { store } from '../store/store'
import { currentlyService } from '../services/currently/currently.service.js'
import { SET_CURRENT_SONG, GET_CURRENT_SONG } from './currently.reducer.js'


export async function getPlayingSong() {
    try{
        const currentSongUrl = await currentlyService.getCurrentSong()
        store.dispatch(getCmdGetCurrentSong(currentSongUrl))
        console.log('CurrentlyActions: successfully loaded song')
    }
    catch (err) {
        console.log('CurrentlyActions: unable to load song', err)
        throw err
    }
}

export async function setPlayingSong(url) {
    try{
        await currentlyService.setCurrentSong(url)
        store.dispatch(getCmdSetCurrentSong(url))
        console.log('CurrentlyActions: successfully set current song')
    }
    catch (err) {
        console.log('CurrentlyActions: unable to set current song', err)
        throw err
    }
}


// Command Creators:

function getCmdGetCurrentSong(currentSongUrl) {
    return {
        type: GET_CURRENT_SONG,
        currentSongUrl
    }
}

function getCmdSetCurrentSong(currentSongUrl) {
    return {
        type: SET_CURRENT_SONG,
        currentSongUrl
    }
}