import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'
import { spotifyYoutubeRoutes } from './api/spotify-youtube/spotifyYoutube.routes.js'
import { stationsRoutes } from './api/stations/stations.routes.js'

//CONFIG
//env file
dotenv.config()

//express
const app = express()
const PORT = 3000
app.use(express.json());

//mongo
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'StationOne'

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
app.use(spotifyYoutubeRoutes)
//youtube get video
app.get('/api/youtube-search', async (req, res) => {
  const inputData = req.query.q
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

  if (!inputData) return res.status(400).json({ error: 'Missing search query (Youtube)' })

  try {
    const googleApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(
      inputData
    )}&type=video&part=id`

    const youtubeRes = await fetch(googleApiUrl)
    const data = await youtubeRes.json()

    res.json(data)
  } catch (error) {
    console.error('YouTube API error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


//spotify get songs




//MONGODB METHODS
app.use(stationsRoutes)




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})