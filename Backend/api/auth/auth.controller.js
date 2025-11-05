import { authService } from "./auth.service.js"

export async function signup (req, res) {

    console.log('this works')
    console.log(req.body)
    const user = req.body
    await authService.signup(user)

    const miniUser = await authService.login(user.username, user.password)
    const loginToken = await authService.createLoginToken(miniUser)

    res.cookie('loginToken', loginToken, {
        httpOnly: true,
        sameSite: 'lax', // set to 'none' with secure: true if front/back are on different domains over HTTPS
        secure: false,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    res.send(miniUser)
}


export async function login (req, res) {
    console.log(req.body)
    const user = req.body
    console.log(user)
    const miniUser = await authService.login(user.username, user.password)
    const loginToken = await authService.createLoginToken(miniUser)
    res.cookie('loginToken', loginToken, {
        httpOnly: true,
        sameSite: 'lax', // set to 'none' with secure: true if front/back are on different domains over HTTPS
        secure: false,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    res.send(miniUser)
}


export async function logout (req, res) {
    res.clearCookie('loginToken')
    res.send('User logged out!')
}