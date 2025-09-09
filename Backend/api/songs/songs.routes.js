import express from "express"
import { getSongFromDB, addSongToDB } from "./songs.controller.js"

const router = express.Router()


router.get('/:songId', getSongFromDB)

router.post('/', addSongToDB)


export const songsRoutes = router