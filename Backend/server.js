import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'

import { spotifyService } from './services/spotify.service.js'

dotenv.config()

const app = express()
const PORT = 3000

var SpotifyTemporaryToken = undefined

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

app.get('/api/youtube-search', async (req, res) => {
  const inputData = req.query.q
  const API_KEY = process.env.YOUTUBE_API_KEY

  if (!inputData) {
    return res.status(400).json({ error: 'Missing search query' })
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(
      inputData
    )}&type=video&part=id`

    const youtubeRes = await fetch(url)
    const data = await youtubeRes.json()

    res.json(data)
  } catch (error) {
    console.error('YouTube API error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


//spotify get access token


app.get('/api/get-spotify-songs', async (req, res) => {
  const q = req.query.q
  const limit = 10
  
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


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})