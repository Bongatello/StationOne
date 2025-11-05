import express from "express"
import { getAllStations, getStationById, createStation, editStation, removeStation } from "./stations.controller.js"
import { requireAuth } from "../auth/auth.middleware.js"


const router = express.Router()


//query stations (list stations) - public
router.get('/', getAllStations)

//station get by id (read station) - public
router.get('/:stationId', getStationById)

//create station - protected
router.post('/', requireAuth, createStation)

//update station - protected
router.put('/', requireAuth, editStation)

//delete station - protected
router.delete('/:stationId', requireAuth, removeStation)



export const stationsRoutes = router