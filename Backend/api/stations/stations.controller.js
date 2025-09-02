import { stationsService } from "./stations.service.js"

export async function getAllStations (req, res) {
    const stations = await stationsService.query()
    res.send(stations)
}

export async function getStationById(req, res) {
  const stationId = req.params.stationId
  var station = await stationsService.getById(stationId)
  res.send(station)
}

export async function createStation (req, res) {
  const station = req.body
  const newStation = await stationsService.addStation(station)
  res.send(newStation)
}

export async function editStation (req,res) {
  const station = req.body
  await stationsService.updateStation(station)
  res.send('Updated Station')
}

export async function removeStation (req, res) {
  const stationId = req.params.stationId
  await stationsService.deleteStation(stationId)
  res.send('Deleted Station')
}