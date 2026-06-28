import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { connectDB } from './config/db'
import { authEvents, EVENT_TYPES } from './events/eventEmitter'
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' }
})

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id)

  Object.values(EVENT_TYPES).forEach((event) => {
    authEvents.on(event, (data) => {
      socket.emit('auth_event', { type: event, ...data, timestamp: new Date() })
    })
  })
})

connectDB().then(() => {
  httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
  })
})