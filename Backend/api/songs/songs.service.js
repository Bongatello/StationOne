import { dbService } from "../../services/mongo/db.service.js"
import { ObjectId } from 'mongodb'

export const songsService = {
    lookupSong,
    addSong,
}

const collectionName = "Songs"

async function lookupSong(songId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const song = await collection.findOne({ spotifyId: songId })
        if (!song) return null
        return song.youtubeId
    } catch (err) {
        console.log('SongsService Error: There was an error trying to find requested song in collection', err)
        throw err
    }
}

async function addSong(spotifySongId, youtubeSongId) {
    try{
        console.log('Spotify and Youtube song IDs: ',spotifySongId, youtubeSongId)
        const collection = await dbService.getCollection(collectionName)
        const song = {
            spotifyId: spotifySongId,
            youtubeId: youtubeSongId
        }
        await collection.insertOne(song)
    } catch(err) {
        console.log('SongsService Error: There was an error adding a song to the collection: ', err)
        throw err
    }
}