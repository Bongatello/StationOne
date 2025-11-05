import express from "express"
import { genericGetSpotifyData, getSpotifyStations, getSpotifyPlaylist, getSpotifyAlbum } from "./spotifyYoutube.controller.js"
import { requireAuth } from "../auth/auth.middleware.js"


const router = express.Router()

//spotify get songs - protected
router.get('/songs', requireAuth, genericGetSpotifyData)

router.get('/stations', requireAuth, getSpotifyStations)

router.get('/playlist', requireAuth, getSpotifyPlaylist)

router.get('/album', requireAuth, getSpotifyAlbum)

//youtube get video - protected
router.get('/youtube', requireAuth, async (req, res) => {
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