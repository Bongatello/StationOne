import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'
import { spotifyService } from './services/spotify.service.js'
import { stationsService } from './services/mongo/Stations.service.js'

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

//spotify
var SpotifyTemporaryToken = undefined

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
app.get('/api/get-spotify-songs', async (req, res) => {
  const q = req.query.q
  const limit = 10


  if (!q) return res.status(400).json({ error: 'Missing search query (Spotify)' })

  //if we dont have a spotify api token (the temporary one you get using id+secret), we use the function getTempSpotifyToken which sends the credentials again to get a new token, else just go straight into querying spotify api
  if (!SpotifyTemporaryToken) SpotifyTemporaryToken = await spotifyService.getTempSpotifyToken()

  //now we get search results from spotify according to our frontend query parameter using a fetch request
  const unprocessedResults = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${SpotifyTemporaryToken}`
    }
  })

  //the response needs to be parsed and cleaned up from properties we dont need, so the next function does just that!
  const cleanQueryResults = await spotifyService.processQueryData(unprocessedResults)

  res.send(cleanQueryResults)
})



//MONGODB METHODS
//query stations (list stations)
app.get('/api/station', async (req, res) => {
  var stations = await stationsService.query()
  res.send(stations)
})
//station get by id (read station)
app.get('/api/station/:stationId', async (req, res) => {
  const stationId = req.params.stationId
  var station = await stationsService.getById(stationId)
  res.send(station)
})
//create station
app.post('/api/station', async (req, res) => {
  const station = req.body
  console.log('body: ', req.body)
  const newStation = await stationsService.addStation(station)
  console.log('Backend app.post: ', newStation)
  res.send(newStation)
})
//update station
app.put('/api/station', async (req,res) => {
  const station = req.body
  await stationsService.updateStation(station)

  res.send('Updated Station')
})
//delete station
app.delete('/api/station/:stationId', async (req, res) => {
  const stationId = req.params.stationId
  await stationsService.deleteStation(stationId)

  res.send('Deleted Station')
})




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})