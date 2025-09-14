export const GET_STATIONS = 'GET_STATIONS'
export const EDIT_STATION = 'EDIT_STATION'
export const UPDATE_STATION_LIST = 'UPDATE_STATION_LIST'
export const SET_SELECTED_STATION = 'SET_SELECTED_STATION'
export const GET_SPOTIFY_STATIONS = 'GET_SPOTIFY_STATIONS'
export const CREATE_STATION_FROM_SPOTIFY = 'CREATE_STATION_FROM_SPOTIFY'


const initialState = {
    spotifyStations: undefined,
    stations: [],
    selectedStation: {
        songs:[]
    }
}

export function stationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_STATIONS:
            return { ...state, stations: action.stations }
        case SET_SELECTED_STATION:
            return {...state, selectedStation: action.selectedStation}
        case UPDATE_STATION_LIST:
            return { ...state, stations: action.updatedStations}
        case EDIT_STATION:
            return { ...state, selectedStation: action.editedStation}
        case GET_SPOTIFY_STATIONS:
            const newSpotifyStations = action.stationsToAdd
            console.log(action.stationsToAdd)
            const newSpotifyStationsState = {
                ...state.spotifyStations,
                ...newSpotifyStations
            }
            return {...state, spotifyStations: newSpotifyStationsState}
        case CREATE_STATION_FROM_SPOTIFY:
            const stationWithSongs = action.stationWithSongs
            const newStationsState = {
                ...state.stations,
            }
        default:
        return state
    }
}