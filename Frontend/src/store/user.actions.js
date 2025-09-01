import { userService } from '../services/user/user.service.js'

import { store } from '../store/store'

import { SET_USER, REMOVE_LIKED_STATION, ADD_LIKED_STATION } from './user.reducer'

//export const userService = {
//    addStation,
//    loadUserData,
//    addToLikedStations,
//    removeFromUserLiked,
//}


export async function loadUser() {
    try {
        const user = await userService.loadUserData()
        store.dispatch(getCmdSetUser(user))
    }
    catch (err) {
        console.log('UserActions: unable to load user', err)
        throw err
    }
}


export async function addLikedStation(station) {
    try {
        await userService.addToLikedStations(station)
        store.dispatch(getCmdAddLikedStation(station))
    }
    catch (err) {
        console.log('UserActions: unable to add station to user', err)
        throw err
    }
}

export async function removeLikedStation(station) {
    try {
        await userService.removeFromLikedStations(station)
        store.dispatch(getCmdRemoveLikedStation(station))
    }
    catch (err) {
        console.log('UserActions: unable to remove station from user', err)
        throw err
    }
}



// Command Creators:
function getCmdSetUser(user) {
    return {
        type: SET_USER,
        user
    }
}

function getCmdAddLikedStation(station) {
    return {
        type: ADD_LIKED_STATION,
        station
    }
}

function getCmdRemoveLikedStation(station) {
    return {
        type: REMOVE_LIKED_STATION,
        station
    }
}