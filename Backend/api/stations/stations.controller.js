import { stationsService } from "./stations.service.js"

export async function getAllStations(req, res) {
  try {
    const stations = await stationsService.query()
    res.send(stations)
  } catch (err) {
    console.log('StationsController: There was an error getting all stations! ', err)
    throw err
  }
}

export async function getStationById(req, res) {
  try {
    const stationId = req.params.stationId
    console.log('id: ', stationId)
    if (!stationId) throw 'Cannot get stationId or stationId was not provided (getStationById)'
    var station = await stationsService.getById(stationId)
    res.send(station)
  } catch (err) {
    console.log('StationsController: There was an error getting requested station! ', err)
    throw err
  }
}

export async function createStation(req, res) {
  try {
    const station = req.body
    console.log(station)
    if (!(station.index || station.name) || !station.addedBy || !station.route || !station._id) throw 'Cannot get index/addedBy/route/id or they are not provided (createStation)'
    const newStation = await stationsService.addStation(station)
    res.send(newStation)
  } catch (err) {
    console.log('StationsController: There was an error creating station! ', err)
    throw err
  }
}

export async function editStation(req, res) {
  try {
    const station = req.body
    if (!station) throw 'Cannot get station or station not provided (editStation)'
    const editedStation = await stationsService.updateStation(station)
    res.send(editedStation)
  } catch (err) {
    console.log('StationsController: There was an error editing requested station! ', err)
    throw err
  }
}

export async function removeStation(req, res) {
  try {
    const stationId = req.params.stationId
    if (!stationId) throw 'Cannot get stationId or stationId not provided (removeStation)'
    await stationsService.deleteStation(stationId)
    res.send('Deleted Station')
  } catch (err) {
    console.log('StationsController: There was an error removing requested station! ', err)
    throw err
  }
}