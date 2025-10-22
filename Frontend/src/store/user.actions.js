import { userService } from '../services/user/user.service.js'
import { store } from '../store/store'
import { LOAD_USER, REMOVE_LIKED_STATION, ADD_LIKED_STATION, EDIT_USER } from './user.reducer'

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


export async function addLikedStation(user, station, route) {
    try {
        await userService.addToLikedStations(user, station, route)
        store.dispatch(getCmdAddLikedStation(station))
    }
    catch (err) {
        console.log('UserActions: unable to add station to user', err)
        throw err
    }
}

export async function removeLikedStation(user, station) {
    try {
        await userService.removeFromLikedStations(user, station._id, station.spotifyApiId)
        store.dispatch(getCmdRemoveLikedStation(station))
    }
    catch (err) {
        console.log('UserActions: unable to remove station from user', err)
        throw err
    }
}

export async function editUser(user, station) {
    try {
        if (station) {
            var userToEdit = userService.setRecentlyPlayed(user, station)
            if (!userToEdit) return
            const editedUser = await userService.editUser(userToEdit)
            store.dispatch(getCmdEditUser(editedUser))
        }
        const editedUser = await userService.editUser(user)
        store.dispatch(getCmdEditUser(editedUser))
    } catch (err) {
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

function getCmdEditUser(editedUser) {
    return {
        type: EDIT_USER,
        editedUser
    }
}