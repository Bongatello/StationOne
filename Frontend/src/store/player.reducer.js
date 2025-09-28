export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const GET_CURRENT_SONG = 'GET_CURRENT_SONG'
export const TOGGLE_MUTE_PLAYER = 'TOGGLE_MUTE_PLAYER' // do i really need this? imo vol control should be only on the player itself and shouldn't be passed to socketio
export const CHANGE_PLAYER_VOLUME = 'CHANGE_PLAYER_VOLUME' // same as toggle mute
export const TOGGLE_PLAY_PLAYER = 'TOGGLE_PLAY_PLAYER'
export const SET_PLAYER_TIME = 'SET_PLAYER_TIME'
export const GET_PLAYER_TIME = 'GET_PLAYER_TIME' //maybe ill need that, unsure
export const GET_PLAYER_STATE = 'GET_PLAYER_STATE'
export const ON_NEXT_SONG = 'ON_NEXT_SONG'
export const ON_PREV_SONG = 'ON_PREV_SONG'
export const SET_CURRENT_STATION = 'SET_CURRENT_STATION'
export const SET_IS_HOST = 'SET_IS_HOST'

const song = {
    url: null
}

const initialState = {
    station: {},
    player: {
        currentStation: {},
        isPlaying: false,
        currentTime: 0,
        currentSong: {
            url: null
        },
        prevSong: song,
        nextSong: song,
        isHost: false,
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
            newState = { ...state, player: newPlayer }
            break

        case SET_CURRENT_SONG:
            var nowPlaying = action.newSong
            var newPlayer = {
                ...state.player,
                currentSong: nowPlaying
            }
            newState = { ...state, player: newPlayer }
            break

        case TOGGLE_PLAY_PLAYER:
            var currentState = action.newState
            var newPlayer = {
                ...state.player,
                isPlaying: currentState
            }
            newState = { ...state, player: newPlayer }
            break

        case SET_PLAYER_TIME:
            var playerTime = action.time
            var newPlayer = {
                ...state.player,
                currentTime: playerTime
            }
            newState = { ...state, player: newPlayer }
            break

        case SET_CURRENT_STATION:
            var currentStation = action.station
            var newState = {
                ...state,
                station: currentStation
            }
            break

        case ON_NEXT_SONG:
            var nextSong = action.nextSong
            var newPlayer = {
                ...state.player,
                currentSong: nextSong
            }
            newState = { ...state, player: newPlayer }
            break

        case ON_PREV_SONG:
            var prevSong = action.prevSong
            var newPlayer = {
                ...state.player,
                currentSong: prevSong,
            }
            newState = { ...state, player: newPlayer }
            break

        case SET_IS_HOST:
            var newPlayer = {
                ...state.player,
                isHost: action.isHost
            }
            newState = {...state, player: newPlayer}
            break

        default:
    }
    return newState
}