import { stationService } from '../services/station/station.service.js'

import { store } from '../store/store'

import { SET_STATIONS, UPDATE_STATION_LIST } from './stations.reducer.js'

//export const stationService = {
//    query,
//    get,
//    addSong,
//    loadStations,
//    combineUserDefaultStations,
//}

export async function setStations() {
    try{
        const stations = await stationService.loadStations()
        store.dispatch(getCmdSetStations(stations))
        console.log('StationActions: successfully loaded ', stations.length, ' stations')
    }
    catch (err) {
        console.log('StationActions: unable to load station list', err)
        throw err
    }
}

export async function updateDefaultAndLikedList() {
    try{
        const updatedStations = await stationService.combineUserDefaultStations()
        store.dispatch(getCmdUpdateStationList(updatedStations))
        console.log('StationActions: successfully added new station to the list')
    }
    catch (err) {
        console.log('StationActions: unable to add created station to the stations list', err)
        throw err
    }
}



// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}

function getCmdUpdateStationList(updatedStations){
    return {
        type: UPDATE_STATION_LIST,
        updatedStations
    }
}