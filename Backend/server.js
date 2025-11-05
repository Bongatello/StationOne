import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import { spotifyYoutubeRoutes } from './api/spotify-youtube/spotifyYoutube.routes.js'
import { stationsRoutes } from './api/stations/stations.routes.js'
import { songsRoutes } from './api/songs/songs.routes.js'
import { usersRoutes } from './api/users/users.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
//CONFIG
//env file
dotenv.config()

//express
const app = express()
const PORT = 3000
app.use(express.json())
app.use(cookieParser())

//pathing
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//cors
const corsOptions = {
  origin: [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5174',
    'http://localhost:5174',
    'https://stationone-firstdeploytest.onrender.com',
    'https://stationone-firstdeploytestfront.onrender.com',
    'https://stationone-firstdeploytestfront.onrender.com/StationOne',
  ],
  credentials: true,
}
app.use(cors(corsOptions))

//sockets
const server = http.createServer(app)
const io = new Server(server, {
  cors: corsOptions
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    console.log(`${socket.id} joined room ${roomId}`)
  })

  socket.on('player-state', ({ roomId, state }) => {
    socket.broadcast.to(roomId).emit('player-state', state)
    console.log(state)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

//API METHODS
app.use('/api/sy', spotifyYoutubeRoutes)
app.use('/api/station', stationsRoutes)
app.use('/api/songs', songsRoutes)
app.use('/api/user', usersRoutes)
app.use('/api/auth', authRoutes)




app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('/*all', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})