export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const GET_CURRENT_SONG = 'GET_CURRENT_SONG'

const song = {
    url: null
}

const initialState = {
    player: {
        currentStation: {},
        currentVolume: {},
        currentSong: {
            url: null
        },
        previousSong: song,
        nextSong: song
    }
}

export function playerReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        case GET_CURRENT_SONG:
            var nowPlaying = action.song
            var newPlayer = {
                ...state.player,
                currentSong: nowPlaying
            }
            console.log('reducer: ', newPlayer)

            newState = { ...state, player: newPlayer }
            break

        case SET_CURRENT_SONG:
            var nowPlaying = action.song
            var newPlayer = {
                ...state.player,
                currentSong: nowPlaying
            }
            console.log('reducer: ', newPlayer)

            newState = { ...state, player: newPlayer }
            break
        default:
    }
    return newState
}