import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'
import { usersService } from '../users/users.service.js'

export const authService = {
    createLoginToken,
    validateLoginToken,
    login,
    signup
}

async function createLoginToken(user) {
    console.log('Secret:', `"${process.env.CRYPTR_SECRET_WORD}"`)
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET_WORD)
    const str = JSON.stringify(user)
    const token = cryptr.encrypt(str)
    return token
}

async function validateLoginToken(token) {
    console.log('Secret:', `"${process.env.CRYPTR_SECRET_WORD}"`)
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET_WORD)
    try {
        const str = cryptr.decrypt(token)
        const user = JSON.parse(str)
        return user
    } catch (err) {
        console.log('there was an error validating login token')
        throw (err)
    }
}

async function login(username, password) {
    const user = await usersService.usernameAvailability(username)
    if (!user) throw 'Unknown username'

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw 'Invalid username or password'

    const miniUser = {
        _id: user._id,
        score: user.score,
        isAdmin: user.isAdmin,
    }
    return miniUser
}

async function signup(user) {
    const saltRounds = 10
    const { username, password } = user

    if (!username || !password) throw 'Missing required signup information' //move to controller

    const checkUsername = await usersService.usernameAvailability(username)
    if (checkUsername) throw 'Username already taken'

    const hash = await bcrypt.hash(password, saltRounds)
    return usersService.addUser(username, hash)
}