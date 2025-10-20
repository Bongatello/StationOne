import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

export const authService = {
    authLogin,
    authSignup,
    authLogout,
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL || '//localhost:3000'
const AUTH_URL = `${BASE_URL}/api/auth`

async function authLogin(userCreds) {
    try{
        const userId = await axios.post(`${AUTH_URL}/login`, userCreds)
        return userId.data
    } catch(err) {
        console.log('AuthService: There was an error logging into StationOne, ', err)
        throw err
    }
}

async function authSignup(userCreds) {
    try{
        const userId = await axios.post(`${AUTH_URL}/signup`, userCreds)
        return userId.data
    } catch(err) {
        console.log('AuthService: There was an error signing up to StationOne, ', err)
        throw err
    }
}

async function authLogout(userId) {
    try{

    } catch(err) {
        console.log('AuthService: There was an error logging out of StationOne, ', err)
        throw err
    }
}