export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const ADD_LIKED_STATION = 'ADD_LIKED_STATION'
export const REMOVE_LIKED_STATION = 'REMOVE_LIKED_STATION'

const initialState = {
    count: 10,
    users: [],
    watchedUser : null,
    user: {
        pfp: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
        likedSongs: ['v1w2x'],
        likedStations: [],
        recentStations: ['b2c3d'],
        createdStationsCount: 1,
    }
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
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
            const afterAddLikedStations = [action.station, ...state.user.likedStations]
            const addedStationUser = {
                ...state.user,
                likedStations: afterAddLikedStations
            }
            newState = {...state, user: addedStationUser}
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState
    
}
