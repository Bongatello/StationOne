export const LOAD_USER = 'LOAD_USER'
export const ADD_LIKED_STATION = 'ADD_LIKED_STATION'
export const REMOVE_LIKED_STATION = 'REMOVE_LIKED_STATION'
//export const REMOVE_USER = 'REMOVE_USER'
//export const SET_USERS = 'SET_USERS'
export const EDIT_USER = 'EDIT_USER'


const initialState = {
    user: {
        name: '',
        image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_960_720.png",
        likedSongs: [],
        likedStations: [],
        recentStations: [],
        createdStationsCount: 1,
    }
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case LOAD_USER:
            newState = { ...state, user: action.user }
            break

        case REMOVE_LIKED_STATION:
            const afterRemoveLikedStations = state.user.likedStations.filter(
                likedStation => likedStation._id !== action.station._id
            )
            const removedStationUser = {
                ...state.user,
                likedStations: afterRemoveLikedStations
            }
            newState = {...state, user: removedStationUser}
            break

        case ADD_LIKED_STATION:
            const afterAddLikedStations = [...state.user.likedStations]
            const addedStationUser = {
                ...state.user,
                likedStations: afterAddLikedStations
            }
            /* newState = {...state, user: addedStationUser} */
            newState = {...state, user: {...state.user, likedStations: afterAddLikedStations}}
            break
        
        case EDIT_USER:
            newState = {...state, user: action.editedUser}
            break
        default:
    }
    return newState
}
