import { MongoClient, ServerApiVersion } from 'mongodb'

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
        const client = await MongoClient.connect(process.env.MONGO_DB_URI)
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.log('Cannot connect to DB', err)
        throw err
    }
}

/* const client = new MongoClient(process.env.MONGO_DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}) */