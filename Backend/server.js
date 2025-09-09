import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'
import { spotifyYoutubeRoutes } from './api/spotify-youtube/spotifyYoutube.routes.js'
import { stationsRoutes } from './api/stations/stations.routes.js'
import { songsRoutes } from './api/songs/songs.routes.js'
import { usersRoutes } from './api/Users/users.routes.js'
//CONFIG
//env file
dotenv.config()

//express
const app = express()
const PORT = 3000
app.use(express.json());

//cors
const corsOptions = {
  origin: [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5174',
    'http://localhost:5174',
  ],
  credentials: true,
}
app.use(cors(corsOptions))


//API METHODS
app.use('/api/sy', spotifyYoutubeRoutes)
app.use('/api/station', stationsRoutes)
app.use('api/songs', songsRoutes)
app.use('api/user', usersRoutes)




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})