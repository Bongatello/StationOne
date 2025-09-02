import express from "express"
import { getSongFromDB, addSongToDB } from "./songs.controller.js"

const router = express.Router()


router.get('/api/songs/:songId', getSongFromDB)

router.post('/api/songs', addSongToDB)


export const songsRoutes = router