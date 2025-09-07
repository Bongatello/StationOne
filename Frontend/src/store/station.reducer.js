export const GET_STATIONS = 'GET_STATIONS'
export const EDIT_STATION = 'EDIT_STATION'
export const UPDATE_STATION_LIST = 'UPDATE_STATION_LIST'
export const SET_SELECTED_STATION = 'SET_SELECTED_STATION'


const initialState = {
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
        default:
        return state
    }
}