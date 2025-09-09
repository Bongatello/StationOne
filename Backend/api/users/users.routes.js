import express from "express"
import { getUsers, getUserById, createUser, editUser } from "./users.controller.js"


const router = express.Router()


//query users (list users)
router.get('/', getUsers)

//user get by id (read user)
router.get('/:userId', getUserById)

//create user
router.post('/', createUser)

//update user
router.put('/', editUser)

//delete user
//router.delete('/api/user/:userId', removeUser)



export const usersRoutes = router