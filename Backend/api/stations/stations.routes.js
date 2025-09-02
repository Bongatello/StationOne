import express from "express"
import { getAllStations, getStationById, createStation, editStation, removeStation } from "./stations.controller.js"


const router = express.Router()


//query stations (list stations)
router.get('/api/station', getAllStations)

//station get by id (read station)
router.get('/api/station/:stationId', getStationById)

//create station
router.post('/api/station', createStation)

//update station
router.put('/api/station', editStation)

//delete station
router.delete('/api/station/:stationId', removeStation)



export const stationsRoutes = router