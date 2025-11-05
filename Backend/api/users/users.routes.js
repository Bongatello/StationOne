import express from "express"
import { getUsers, getUserById, createUser, editUser } from "./users.controller.js"
import { requireAuth } from "../auth/auth.middleware.js"


const router = express.Router()


//query users (list users) - protected
router.get('/', requireAuth, getUsers)

//user get by id (read user) - protected
router.get('/:userId', requireAuth, getUserById)

//create user - public (signup handled by auth routes)
router.post('/', createUser)

//update user - protected
router.put('/', requireAuth, editUser)

//delete user
//router.delete('/api/user/:userId', removeUser)



export const usersRoutes = router