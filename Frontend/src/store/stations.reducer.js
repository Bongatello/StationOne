export const SET_STATIONS = 'SET_STATIONS'
//export const GET_STATION = 'GET_STATION'
export const UPDATE_STATION_LIST = 'UPDATE_STATION_LIST'


const initialState = {
    stations: [],
}

export function stationsReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_STATIONS:
            return { ...state, stations: action.stations }
        case UPDATE_STATION_LIST:
            return { ...state, stations: action.updatedStations}
        default:
        return state
    }
}