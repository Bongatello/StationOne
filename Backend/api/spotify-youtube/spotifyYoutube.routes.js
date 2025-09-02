import express from "express"
import { getSpotifySongs } from "./spotifyYoutube.controller.js"


const router = express.Router()

//spotify get songs
router.get('/api/get-spotify-songs', getSpotifySongs)

//youtube get video
router.get('/api/youtube-search', async (req, res) => {
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

export const spotifyYoutubeRoutes = router