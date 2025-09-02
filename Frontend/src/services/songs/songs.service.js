import axios from "axios"

export const songsService = {
    getYoutubeId,
    addSong
}

const BASE_URL = "//localhost:3000/api/songs"

async function getYoutubeId(spotifyId) {
    try {
        const youtubeId = await axios.get(`${BASE_URL}/${spotifyId}`)
        console.log('songs.service: ', youtubeId.data)
        return youtubeId.data
    } catch (err) {
        console.log('SongsService: There was an error finding the requested song, ', err)
        throw err
    }
}

async function addSong(song) {
    try {
        console.log('debugging: ', song)
        await axios.post(BASE_URL, song)
        return console.log('Successfully added a song!')
    } catch (err) {
        console.log('SongsService: There was an error adding the requested song, ', err)
        throw err
    }
}