import { spotifyYoutubeService } from "./spotifyYoutube.service.js"


export async function getSpotifySongs(req, res) {
    try {
        const q = req.query.q
        const limit = 10
        if (!q) return res.status(400).json({ error: 'Missing search query (Spotify Songs)' })
        const queryResults = await spotifyYoutubeService.getSpotifySongs(q, limit)
        res.send(queryResults)
    } catch (err) {
        console.log('SpotifyYoutube Controller: There was an error getting songs from spotify: ', err)
        throw err
    }
}

export async function getYoutubeMusic(req, res) {
    try {
        const inputData = req.query.q
        if (!inputData) return res.status(400).json({ error: 'Missing search query (Youtube)' })
        const data = await spotifyYoutubeService.getYoutubeVideo(inputData)
        res.json(data)
    } catch (error) {
        console.log('YouTube API error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getSpotifyStations(req, res) {
    try {
        const inputData = req.query.genre
        const limit = 10
        if (!inputData) return res.status(400).json({ error: 'Missing search query (Spotify Stations)' })
        const queryResults = await spotifyYoutubeService.getSpotifyStations(inputData, limit)
        res.send(queryResults)
    } catch (err) {
        console.log('SpotifyYoutube Controller: There was an error getting stations from spotify: ', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getSpotifyStationSongsById(req, res) {
    try {
        const id = req.query.playlistId
        if (!id) return res.status(400).json({ error: 'Missing spotify playlist id (Spotify Stations)' })
        const station = await spotifyYoutubeService.getSpotifyStationSongsById(id)
        res.send(station)
    } catch (err) {
        console.log('SpotifyYoutube Controller: There was an error getting station by id from spotify: ', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}