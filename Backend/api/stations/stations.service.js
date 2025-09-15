import { dbService } from '../../services/mongo/db.service.js'
import { ObjectId } from 'mongodb'
import { MongoClient, ServerApiVersion } from 'mongodb'


export const stationsService = {
    query,
    getById,
    addStation,
    deleteStation,
    updateStation,
}

const collectionName = "Stations"

async function query() {

    try {
        const collection = await dbService.getCollection(collectionName)
        const stations = await collection.find({}).toArray() //ill need to add criteria to find {} later on, according to the query parameters, but for now i will just look for all stations
        return stations
    } catch (err) {
        console.log('StationsService Error: Cannot retrieve/query collection')
        throw err
    }
}

async function getById(stationId) {
    try {
        console.log('station: ',stationId)
        var station
        const collection = await dbService.getCollection(collectionName)
        if (stationId.length === 24) station = await collection.findOne({ _id: ObjectId.createFromHexString(stationId) })
        if (stationId.length === 22) station = await collection.findOne({ spotifyApiId: stationId })
        console.log(station)
        return station
    } catch (err) {
        console.log('StationsService Error: Cannot get station by specified id')
        throw err
    }
}

async function addStation(station) {
    try {
        const collection = await dbService.getCollection(collectionName)
        var stationToAdd = {}
        if (station.index) {
            const { index, addedBy } = station
            const name = 'My Station #' + index
            stationToAdd = { ..._getEmptyStation(), name, addedBy }
        }
        else if (station.name) {
            stationToAdd = {...station}
        }
        await collection.insertOne(stationToAdd)
        return stationToAdd

    } catch (err) {
        console.log('StationService Error: Cannot add station')
        throw err
    }
}

async function deleteStation(stationId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.deleteOne({ _id: ObjectId.createFromHexString(stationId) })
    } catch (err) {
        console.log('StationsService Error: Cannot remove specified station')
        throw err
    }
}

async function updateStation(station) {
    try {
        const { _id, name, thumbnail, songs, tags, isPrivate } = station
        const stationUpdates = {}
        if (name) stationUpdates.name = name
        if (thumbnail) stationUpdates.thumbnail = thumbnail
        if (songs) stationUpdates.songs = songs
        if (tags) stationUpdates.tags = tags
        if (typeof isPrivate === "boolean") stationUpdates.isPrivate = isPrivate //this one is tricky, tried changing to false and since bool false makes us skip this part, we need to set it as isPrivate === true || isPrivate === false so undefined doesnt count, or simply checking if its boolean

        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ _id: ObjectId.createFromHexString(_id) },
            {
                $set: { ...stationUpdates }
            })
        const editedStation = await collection.findOne({ _id: ObjectId.createFromHexString(_id) })
        return editedStation
    } catch (err) {
        console.log('StationService Error: Cannot update specified station')
        throw err
    }
}



function _getEmptyStation() {
    return {
        songs: [],
        tags: [],
        isPrivate: true
    }
}