import { stationService } from '../services/station/station.service.js'

import { store } from './store.js'

import { EDIT_STATION, GET_STATIONS, UPDATE_STATION_LIST, SET_SELECTED_STATION } from './station.reducer.js'

export async function getStations() {
    try {
        const stations = await stationService.loadStations()
        store.dispatch(getCmdGetStations(stations))
        console.log('StationActions: successfully loaded ', stations.length, ' stations')
    } catch (err) {
        console.log('StationActions: unable to load station list ', err)
        throw err
    }
}

export async function setSelectedStation(stationId) {
    try {
        const selectedStation = await stationService.get(stationId)
        store.dispatch(getCmdSetSelectedStation(selectedStation))
        console.log('StationActions: successfully loaded station ', selectedStation)
    } catch (err) {
        console.log('StationActions: unable to load selected station ', err)
        throw err
    }
}

export async function updateDefaultAndLikedList() {
    try {
        const updatedStations = await stationService.combineUserDefaultStations()
        store.dispatch(getCmdUpdateStationList(updatedStations))
        console.log('StationActions: successfully added new station to the list')
    }
    catch (err) {
        console.log('StationActions: unable to add created station to the stations list ', err)
        throw err
    }
}

export async function editStation(station) {
    try {
        const editedStation = await stationService.editStation(station)
        store.dispatch(getCmdEditStation(editedStation))
        console.log('StationActions: successfully edited station')
    } catch (err) {
        console.log('StationActions: unable to edit selected station ', err)
        throw err
    }
}



// Command Creators:
function getCmdGetStations(stations) {
    return {
        type: GET_STATIONS,
        stations
    }
}

function getCmdUpdateStationList(updatedStations) {
    return {
        type: UPDATE_STATION_LIST,
        updatedStations
    }
}

function getCmdGetStationById(station) {
    return {
        type: GET_STATION_BY_ID,
        station
    }
}

function getCmdEditStation(editedStation) {
    return {
        type: EDIT_STATION,
        editedStation
    }
}

function getCmdSetSelectedStation(selectedStation) {
    return{
        type: SET_SELECTED_STATION,
        selectedStation
    }
}