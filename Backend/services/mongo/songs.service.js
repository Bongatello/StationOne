import { dbService } from "./db.service.js"
import { ObjectId } from 'mongodb'

export const stationsService = {
    lookupSong,
    addSong,
}

const collectionName = "Songs"

async function lookupSong() {
    try {
        const collection = await dbService.getCollection(collectionName)
        const song = await collection.findOne({ spotifyId: ObjectId.createFromHexString(songId) }) //ill need to add criteria to find {} later on, according to the query parameters, but for now i will just look for all stations
        if (song) return song
        return null
    } catch (err) {
        console.log('SongsService Error: ', err)
        throw err
    }
}