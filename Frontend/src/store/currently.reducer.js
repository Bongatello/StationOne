export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const GET_CURRENT_SONG = 'GET_CURRENT_SONG'


const initialState = {
    currently: {
        currentStation: {},
        currentVolume: {},
        currentSong: {},
        previousSong: {},
        nextSong: {},
    }
}

export function currentlyReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        case GET_CURRENT_SONG:
            var nowPlaying = action.currentSongUrl
            var newCurrently = {
                ...state.currently,
                currentSong: nowPlaying
            }

            newState = {...state, currently: newCurrently}
            break

        case SET_CURRENT_SONG:
            var nowPlaying = action.currentSongUrl
            var newCurrently = {
                ...state.currently,
                currentSong: nowPlaying
            }
    
                newState = {...state, currently: newCurrently}
                break
            default:
    }
    return newState
}