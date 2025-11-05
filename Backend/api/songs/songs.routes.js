import express from "express"
import { getSongFromDB, addSongToDB } from "./songs.controller.js"
import { requireAuth } from "../auth/auth.middleware.js"

const router = express.Router()


//get song - public
router.get('/:songId', getSongFromDB)

//add song - protected
router.post('/', requireAuth, addSongToDB)


export const songsRoutes = router