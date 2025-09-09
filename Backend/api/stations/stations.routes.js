import express from "express"
import { getAllStations, getStationById, createStation, editStation, removeStation } from "./stations.controller.js"


const router = express.Router()


//query stations (list stations)
router.get('/', getAllStations)

//station get by id (read station)
router.get('/:stationId', getStationById)

//create station
router.post('/', createStation)

//update station
router.put('/', editStation)

//delete station
router.delete('/:stationId', removeStation)



export const stationsRoutes = router