import { dbService } from '../../services/mongo/db.service.js'
import { ObjectId } from 'mongodb'

export const usersService = {
    query,
    getById,
    addUser,
    deleteUser,
    updateUser,
}

const collectionName = "Users"


async function query() {
    try {
        const collection = await dbService.getCollection(collectionName)
        const users = await collection.find({}).toArray() //ill need to add criteria to find {} later on, according to the query parameters, but for now i will just look for all users
        return users
    } catch (err) {
        console.log('UsersService Error: Cannot retrieve/query collection')
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const user = await collection.findOne({ _id: ObjectId.createFromHexString(userId) })
        return user
    } catch (err) {
        console.log('UsersService Error: Cannot get user by specified id')
        throw err
    }
}

async function addUser(user) {
    try {
        const { userName } = user
        const collection = await dbService.getCollection(collectionName)
        const checkAvaialbe = await collection.findOne({ name: ObjectId.createFromHexString(userName) })
        if (checkAvaialbe) throw 'Username already taken'

        const userToAdd = {}
        userToAdd.name = userName
        userToAdd.image = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_960_720.png"
        userToAdd.likedSongs = []
        userToAdd.likedStations = []//should only include mini stations (_id, name, addedBy, thumbnail)
        userToAdd.recentStations = []
        await collection.insertOne(userToAdd)
        return userToAdd

    } catch (err) {
        console.log('UserService Error: Cannot add user')
        throw err
    }
}

async function deleteUser(userId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.deleteOne({ _id: ObjectId.createFromHexString(userId) })
    } catch (err) {
        console.log('UsersService Error: Cannot remove specified user')
        throw err
    }
}

async function updateUser(userToEdit) {
    try {
        const { _id, likedStations, likedSongs, image } = userToEdit
        const userUpdates = {}
        if (likedStations) userUpdates.likedStations = likedStations
        if (likedSongs) userUpdates.likedSongs = likedSongs
        if (image) userUpdates.image = image

        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ _id: ObjectId.createFromHexString(_id) },
            {
                $set: { ...userUpdates }
            })
    } catch (err) {
        console.log('UsersService Error: Cannot update specified user')
        throw err
    }
}