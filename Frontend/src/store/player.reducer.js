export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const GET_CURRENT_SONG = 'GET_CURRENT_SONG'
export const TOGGLE_MUTE_PLAYER = 'TOGGLE_MUTE_PLAYER' // do i really need this? imo vol control should be only on the player itself and shouldn't be passed to socketio
export const CHANGE_PLAYER_VOLUME = 'CHANGE_PLAYER_VOLUME' // same as toggle mute
export const TOGGLE_PLAY_PLAYER = 'TOGGLE_PLAY_PLAYER'
export const SET_PLAYER_TIME = 'SET_PLAYER_TIME'
export const GET_PLAYER_TIME = 'GET_PLAYER_TIME' //maybe ill need that, unsure
export const GET_PLAYER_STATE = 'GET_PLAYER_STATE'

const song = {
    url: null
}

const initialState = {
    player: {
        currentStation: {},
        isPlaying: false,
        currentTime: 0,
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
            var nowPlaying = action.newSong
            var newPlayer = {
                ...state.player,
                currentSong: nowPlaying
            }
            console.log('reducer: ', newPlayer)

            newState = { ...state, player: newPlayer }
            break
        
        case TOGGLE_PLAY_PLAYER:
            var currentState = action.newState
            var newPlayer = {
                ...state.player,
                isPlaying: currentState
            }
            console.log('player reducer isPlaying: ', currentState)

            newState = {...state, player: newPlayer}
            break

        case SET_PLAYER_TIME:
            var playerTime = action.time
            var newPlayer = {
                ...state.player,
                currentTime: playerTime
            }

            newState={...state, player: newPlayer}
            break

        default:
    }
    return newState
}