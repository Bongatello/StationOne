import { userService } from '../services/user/user.service.js'

import { store } from '../store/store'

import { LOAD_USER, REMOVE_LIKED_STATION, ADD_LIKED_STATION, EDIT_USER } from './user.reducer'

//export const userService = {
//    addStation,
//    loadUserData,
//    addToLikedStations,
//    removeFromUserLiked,
//}


export async function loadUser(userId) {
    try {
        const user = await userService.loadUserData(userId)
        store.dispatch(getCmdLoadUser(user))
    }
    catch (err) {
        console.log('UserActions: unable to load user', err)
        throw err
    }
}


export async function addLikedStation(user, station) {
    try {
        await userService.addToLikedStations(user, station)
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

export async function editUser(userToEdit) {
    try{
        await userService.editUser(userToEdit)
    } catch(err) {
        console.log('UserActions: unable to edit requested liked station.', err)
        throw err
    }
}



// Command Creators:
function getCmdLoadUser(user) {
    return {
        type: LOAD_USER,
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

function getCmdEditUser(editedUser){
    return {
        type: EDIT_USER,
        editedUser
    }
}