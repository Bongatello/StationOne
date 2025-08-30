import {MongoClient} from 'mongodb'

export const dbService = {
    getCollection
}

const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'StationOne'

var dbConn = null

async function getCollection(collectionName) {
    const db = await _connect()
    return db.collection(collectionName)
}

async function _connect() {
    if (dbConn) return dbConn

    try {
        const client = await MongoClient.connect(mongoUrl)
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.log('Cannot connect to DB', err)
        throw err
    }
}