import express from "express"
import { getUsers, getUserById, createUser, editUser } from "./users.controller.js"


const router = express.Router()


//query users (list users)
router.get('/api/user', getUsers)

//user get by id (read user)
router.get('/api/user/:userId', getUserById)

//create user
router.post('/api/user', createUser)

//update user
router.put('/api/user', editUser)

//delete user
//router.delete('/api/user/:userId', removeUser)



export const usersRoutes = router