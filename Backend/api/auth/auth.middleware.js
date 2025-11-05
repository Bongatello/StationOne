import { authService } from './auth.service.js'
import { usersService } from '../users/users.service.js'

export async function requireAuth(req, res, next) {
    try {
        const loginToken = req.cookies.loginToken
        if (!loginToken) {
            res.status(401).send('No authentication token provided')
            return
        }

        const user = await authService.validateLoginToken(loginToken)
        if (!user) {
            res.status(401).send('Invalid authentication token')
            return
        }

        // Check if user's access has expired (for non-admin users only)
        if (!user.isAdmin) {
            const isExpired = await usersService.isUserExpired(user._id)
            if (isExpired) {
                res.status(403).send({ 
                    message: 'Your 24-hour trial period has expired. Please contact an administrator for access.',
                    expired: true 
                })
                return
            }
        }

        req.loggedinUser = user
        next()
    } catch (err) {
        res.status(401).send('Authentication failed')
    }
}

