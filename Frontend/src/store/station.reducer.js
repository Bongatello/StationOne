export const GET_STATIONS = 'GET_STATIONS'
export const EDIT_STATION = 'EDIT_STATION'
export const UPDATE_STATION_LIST = 'UPDATE_STATION_LIST'
export const GET_STATION_BY_ID = 'GET_STATION_BY_ID'


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
        case GET_STATION_BY_ID:
            return {...state, selectedStation: action.station}
        case UPDATE_STATION_LIST:
            return { ...state, stations: action.updatedStations}
        case EDIT_STATION:
            console.log('Debugging!!!! ', action.editedStation)
            return { ...state, selectedStation: action.editedStation}
        default:
        return state
    }
}