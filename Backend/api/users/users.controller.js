import { usersService } from "./users.service.js"

export async function getUsers (req, res) {
    const users = await usersService.query()
    res.send(users)
}

export async function getUserById(req, res) {
  const userId = req.params.userId
  var user = await usersService.getById(userId)
  res.send(user)
}

export async function createUser (req, res) {
  const user = req.body
  const newUser = await usersService.addUser(user)
  res.send(newUser)
}

export async function editUser (req,res) {
  const userToEdit = req.body
  await usersService.updateUser(userToEdit)
  res.send('Updated User')
}

export async function removeUser (req, res) {
  const userId = req.params.userId
  await usersService.deleteUser(userId)
  res.send('Deleted User')
}