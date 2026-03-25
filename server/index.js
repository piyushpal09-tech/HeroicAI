const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const { connectDB } = require('./config/db')
const { getPostgresPool } = require('./config/postgres')
const authRoutes = require('./routes/auth')
const aiRoutes = require('./routes/ai')
const userRoutes = require('./routes/user')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const configuredOrigins = [
  process.env.CLIENT_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ...(process.env.ADDITIONAL_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
]

const allowedOrigins = Array.from(
  new Set(['http://localhost:5173', 'https://heroicai.vercel.app', ...configuredOrigins].filter(Boolean)),
)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Origin not allowed by CORS'))
    },
    credentials: true,
  }),
)

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/api/health', async (req, res) => {
  const postgresPool = getPostgresPool()
  const postgresReady = Boolean(postgresPool)

  res.json({
    status: 'ok',
    postgresReady,
    mongoConfigured: Boolean(process.env.MONGO_URI),
    redisConfigured: Boolean(process.env.REDIS_URL),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/user', userRoutes)

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ message: error.message || 'Unexpected server error.' })
})

const startServer = async () => {
  await connectDB()
  getPostgresPool()

  app.listen(PORT, () => {
    console.log(`HeroicAI server listening on port ${PORT}`)
  })
}

startServer()
