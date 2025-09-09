import { usersService } from "./users.service.js"

export async function getUsers(req, res) {
  try {
    const users = await usersService.query()
    res.send(users)
  } catch (err) {
    console.log('UsersController: There was an error getting all users! ', err)
    throw err
  }
}

export async function getUserById(req, res) {
  try {
    const userId = req.params.userId
    if (!userId) throw 'Cannot get userId or userId was not provided (getUserById)'
    var user = await usersService.getById(userId)
    res.send(user)
  } catch (err) {
    console.log('UsersController: There was an error getting requested user! ', err)
    throw err
  }
}

export async function createUser(req, res) {
  try {
    const user = req.body
    if (!user.userName) throw 'Cannot get userName or userName was not provided (createUser)'
    const newUser = await usersService.addUser(user)
    res.send(newUser)
  } catch (err) {
    console.log('UsersController: There was an error creating user! ', err)
    throw err
  }
}

export async function editUser(req, res) {
  try {
    const userToEdit = req.body
    if (!userToEdit._id) throw 'Cannot get user._id or user._id was not provided (editUser)'
    await usersService.updateUser(userToEdit)
    res.send('Updated User')
  } catch (err) {
    console.log('UsersController: There was an error editing requested user! ', err)
    throw err
  }
}

export async function removeUser(req, res) {
  try {
    const userId = req.params.userId
    if (!userId) throw 'Cannot get userId or userId was not provided (removeUser)'
    await usersService.deleteUser(userId)
    res.send('Deleted User')
  } catch (err) {
    console.log('UsersController: There was an error removing requested user! ', err)
    throw err
  }
}