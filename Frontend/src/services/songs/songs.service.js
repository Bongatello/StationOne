import Axios from 'axios'
import { setPlayingSong } from "../../store/player.actions"

var axios = Axios.create({
    withCredentials: true,
})
const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY //my youtube api key is inside the .env file which is included in .gitignore

export const songsService = {
    getYoutubeId,
    addSong,
    findOnYoutube,
    getYoutubeSong,
    querySpotifyByText
}
const BASE_URL = import.meta.env.VITE_BACKEND_URL || '//localhost:3000'
const USER_URL = `${BASE_URL}/api/songs`

async function getYoutubeId(spotifyId) {
    try {
        const youtubeId = await axios.get(`${USER_URL}/${spotifyId}`)
        return youtubeId.data
    } catch (err) {
        console.log('SongsService: There was an error finding the requested song, ', err)
        throw err
    }
}

async function addSong(song) {
    try {
        await axios.post(USER_URL, song)
        return console.log('Successfully added a song!')
    } catch (err) {
        console.log('SongsService: There was an error adding the requested song, ', err)
        throw err
    }
}

async function findOnYoutube(song) { //upon removing notes, add spotifySongId to function dependencies
    const spotifySongId = song.spotifyId
    var firstVideoId = await getYoutubeId(spotifySongId)
    if (firstVideoId) console.log('no -100 credits this time :)')
    if (!firstVideoId) {
        var inputData
        if (song.name) inputData = song.artists + '-' + song.name + ' song'
        if (song.songName) inputData = song.artists + '-' + song.songName + ' song'
        console.log('Looking Youtube For: ', inputData)
        const ytApiSearchData = await getYoutubeSong(inputData)
        console.log('Google Api Used, -100 credits :(')
        firstVideoId = ytApiSearchData.items[0].id.videoId
        const songToStore = {
            spotifySongId: spotifySongId,
            youtubeSongId: firstVideoId
        }
        await addSong(songToStore) // this function should add both ids under the same object in mongo, meaning next time we ask for the youtube id, we can check if there is a spotify id matching to the required song that the user wants to play
    }
    const ytSongUrl = `https://www.youtube.com/watch?v=${firstVideoId}`
    song.url = ytSongUrl
    setPlayingSong(song)
    console.log('Now playing: ', song)
}

async function getYoutubeSong(inputData) {
    const res = await axios.get(`${BASE_URL}/api/sy/youtube`, {
        params: { q: inputData },
        withCredentials: true,
    })
    return res.data
}

async function querySpotifyByText(text, limit, type) {
    const res = await axios.get(`${BASE_URL}/api/sy/songs`, { params: { q: text, limit: limit, type: type } })
    return res.data
}
