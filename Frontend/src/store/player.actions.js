import { store } from './store.js'
import { playerService } from '../services/player/player.service.js'
import { SET_CURRENT_SONG, GET_CURRENT_SONG, TOGGLE_PLAY_PLAYER, SET_PLAYER_TIME, ON_NEXT_SONG, ON_PREV_SONG, SET_CURRENT_STATION, SET_IS_HOST } from './player.reducer.js'
import { stationService } from '../services/station/station.service.js'
import { userService } from '../services/user/user.service.js'
import { editUser } from './user.actions.js'


export async function getPlayingSong() {
    try {
        const song = await playerService.getCurrentSong()
        store.dispatch(getCmdGetCurrentSong(song))
        console.log('PlayerActions: successfully loaded song')
    } catch (err) {
        console.log('PlayerActions: unable to load song', err)
        throw err
    }
}

export async function setPlayingSong(newSong) {
    try {
        await playerService.setCurrentSong(newSong)
        store.dispatch(getCmdSetCurrentSong(newSong))
        console.log('PlayerActions: successfully set current song')
    } catch (err) {
        console.log('PlayerActions: unable to set current song', err)
        throw err
    }
}

export async function togglePlayerState(newState) {
    try {
        store.dispatch(getCmdTogglePlayPlayer(newState))
        console.log('PlayerActions: successfully set new player state: ', newState)
    } catch (err) {
        console.log('PlayerActions: unable to set new player state: ', err)
        throw err
    }
}

export async function setPlayerTime(time) {
    try {
        store.dispatch(getCmdSetPlayerTime(time))
    } catch (err) {
        console.log('PlayerActions: unable to set new player time: ', err)
        throw err
    }
}

export async function onNextSong(station, currSongId) {
    try {
        const nextSong = await playerService.getPrevNextSong('next', station, currSongId)
        store.dispatch(getCmdOnNextSong(nextSong))
    } catch (err) {
        console.log('PlayerActions: unable to get next song: ', err)
        throw err
    }
}

export async function onPrevSong(station, currSongId) {
    try {
        const prevSong = await playerService.getPrevNextSong('prev', station, currSongId)
        store.dispatch(getCmdOnPrevSong(prevSong))
    } catch (err) {
        console.log('PlayerActions: unable to get previous song: ', err)
        throw err
    }
}

export async function setPlayerStation(stationId, user) {
    try {
        const station = await stationService.get(stationId)
        await editUser(user, station) // this func should add recently played station to user recently played stations
        store.dispatch(getCmdSetPlayerStation(station))
    } catch (err) {
        console.log('PlayerActions: Unable to set player station, ', err)
        throw err
    }
}

export async function setIsHost(isHost) {
    try {
        store.dispatch(getCmdSetIsHost(isHost))
    } catch (err) {
        console.log('PlayerActions: Unable to set player station, ', err)
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

function getCmdOnNextSong(nextSong) {
    return {
        type: ON_NEXT_SONG,
        nextSong
    }
}

function getCmdOnPrevSong(prevSong) {
    return {
        type: ON_PREV_SONG,
        prevSong
    }
}

function getCmdSetPlayerStation(station) {
    return {
        type: SET_CURRENT_STATION,
        station
    }
}

function getCmdSetIsHost(isHost) {
    return {
        type: SET_IS_HOST,
        isHost
    }
}