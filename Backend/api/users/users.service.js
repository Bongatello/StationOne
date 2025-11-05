import { dbService } from '../../services/mongo/db.service.js'
import { ObjectId } from 'mongodb'

export const usersService = {
    query,
    getById,
    addUser,
    deleteUser,
    updateUser,
    usernameAvailability,
    isUserExpired,
}

const collectionName = "Users"


async function query() {
    try {
        const collection = await dbService.getCollection(collectionName)
        const users = await collection.find({}).toArray() //ill need to add criteria to find {} later on, according to the query parameters, but for now i will just look for all users
        const usersWithoutPassword =[]
        users.forEach(user => {
            var withoutPass = {
                _id: user._id,
                name: user.name,
            }
            usersWithoutPassword.push(withoutPass)
        })
        return usersWithoutPassword
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

async function addUser(username, password) {
    try {
        const collection = await dbService.getCollection(collectionName)

        const userToAdd = {}
        userToAdd.name = username
        userToAdd.password = password
        userToAdd.likedSongs = []
        userToAdd.likedStations = []//should only include mini stations (_id, name, addedBy, thumbnail)
        userToAdd.recentStations = []
        userToAdd.createdAt = new Date() // Store signup timestamp
        userToAdd.isAdmin = false // Default to non-admin
        await collection.insertOne(userToAdd)
        return

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
        const { _id, likedStations, likedSongs, image, recentStations } = userToEdit
        const userUpdates = {}
        if (likedStations) userUpdates.likedStations = likedStations
        if (likedSongs) userUpdates.likedSongs = likedSongs
        if (recentStations) userUpdates.recentStations = recentStations
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

async function usernameAvailability(username) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const user = await collection.findOne({ name: username })
        if (user) return user
        return
    } catch (err) {
        console.log('Could not check username availability, ', err)
        throw err
    }
}

async function isUserExpired(userId) {
    try {
        const user = await getById(userId)
        
        // If user is admin, they never expire
        if (user.isAdmin) return false
        
        // If user doesn't have createdAt field (for existing users without it), allow access
        if (!user.createdAt) return false
        
        // Calculate time difference
        const now = new Date()
        const createdAt = new Date(user.createdAt)
        const timeDiff = now - createdAt
        const hoursDiff = timeDiff / (1000 * 60 * 60)
        
        // Return true if more than 24 hours have passed
        return hoursDiff > 24
    } catch (err) {
        console.log('Could not check if user is expired, ', err)
        throw err
    }
}