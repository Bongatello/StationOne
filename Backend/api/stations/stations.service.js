import { dbService } from '../../services/mongo/db.service.js'
import { ObjectId } from 'mongodb'

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
        const collection = await dbService.getCollection(collectionName)
        const station = await collection.findOne({ _id: ObjectId.createFromHexString(stationId) })
        return station
    } catch (err) {
        console.log('StationsService Error: Cannot get station by specified id')
        throw err
    }
}

async function addStation(station) {
    try {
        const { index, addedBy } = station
        if (!index || !addedBy) throw 'Name or user(addedBy) missing'

        const collection = await dbService.getCollection(collectionName)
        const name = 'My Station #' + index
        const stationToAdd = { name, addedBy }

        stationToAdd.thumbnail = "https://www.vicentenews.com/wp-content/uploads/2024/08/DJ-Maphorisa-Kabza-De-Small-OSKIDO-Afro-Wave-feat.-Olodum-Tman-Xpress-Phila-Dlozi.png"
        stationToAdd.songs = []
        stationToAdd.tags = []
        stationToAdd.isPrivate = true
        await collection.insertOne(stationToAdd)
        return stationToAdd

    } catch (err) {
        console.log('StationService Error: Cannot add station')
        throw err
    }
}

async function deleteStation(stationId) {
    try {
        if (!stationId) throw 'Cannot get stationId or stationId not provided'
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