import { store } from './store.js'
import { playerService } from '../services/player/player.service.js'
import { SET_CURRENT_SONG, GET_CURRENT_SONG, TOGGLE_PLAY_PLAYER, SET_PLAYER_TIME } from './player.reducer.js'


export async function getPlayingSong() {
    try{
        const song = await playerService.getCurrentSong()
        store.dispatch(getCmdGetCurrentSong(song))
        console.log('PlayerActions: successfully loaded song')
    } catch (err) {
        console.log('PlayerActions: unable to load song', err)
        throw err
    }
}

export async function setPlayingSong(newSong) {
    try{
        await playerService.setCurrentSong(newSong)
        store.dispatch(getCmdSetCurrentSong(newSong))
        console.log('PlayerActions: successfully set current song')
    } catch (err) {
        console.log('PlayerActions: unable to set current song', err)
        throw err
    }
}

export async function togglePlayerState(newState) {
    try{
        //const newState = await playerService.setToggleState(state)
        store.dispatch(getCmdTogglePlayPlayer(newState))
        console.log('PlayerActions: successfully set new player state: ', newState)
    } catch (err) {
        console.log('PlayerActions: unable to set new player state: ', err)
        throw err
    }
}

export async function setPlayerTime(time) {
    try{
        //const newTime = await playerService.setTimeUpdate(time)
        store.dispatch(getCmdSetPlayerTime(time))
    } catch (err) {
        console.log('PlayerActions: unable to set new player time: ', err)
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

function getCmdSetCurrentSong(newSong) {
    return {
        type: SET_CURRENT_SONG,
        newSong
    }
}

function getCmdTogglePlayPlayer(newState) {
    return {
        type: TOGGLE_PLAY_PLAYER,
        newState
    }
}

function getCmdSetPlayerTime(time) {
    return {
        type: SET_PLAYER_TIME,
        time
    }
}