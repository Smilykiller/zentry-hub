require('dotenv').config()

const express      = require('express')
const helmet       = require('helmet')
const cors         = require('cors')
const cookieParser = require('cookie-parser')

const authRoutes        = require('./routes/auth')
const projectRoutes     = require('./routes/projects')
const testimonialRoutes = require('./routes/testimonials')
const contactRoutes     = require('./routes/contact')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Security headers ─────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

// ── CORS — allow both local and production frontend ──────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://zentry-hub.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    console.warn(`CORS blocked origin: ${origin}`)
    return callback(new Error(`Origin ${origin} not allowed by CORS`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}))

// Handle preflight requests
app.options('*', cors())

// ── Body parsers ─────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// ── Health check ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Zentry Hub API', time: new Date().toISOString() })
})

app.get('/health', (req, res) => {
  res.json({
    status:   'ok',
    service:  'Zentry Hub API',
    env:      process.env.NODE_ENV,
    db:       process.env.DATABASE_URL ? 'configured' : 'MISSING',
    jwt:      process.env.JWT_SECRET   ? 'configured' : 'MISSING',
    time:     new Date().toISOString(),
  })
})

// ── Routes ───────────────────────────────────────────────────────
app.use('/api/auth',         authRoutes)
app.use('/api/projects',     projectRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api',              contactRoutes)

// ── 404 ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
})

// ── Global error handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  if (err.message?.includes('CORS')) {
    return res.status(403).json({ error: 'CORS: origin not allowed' })
  }
  res.status(500).json({ error: 'Internal server error' })
})

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Zentry Hub API → http://localhost:${PORT}`)
  console.log(`  Env: ${process.env.NODE_ENV || 'development'}`)
  console.log(`  Allowed origins: ${allowedOrigins.join(', ')}`)
  console.log(`  Health: http://localhost:${PORT}/health\n`)
})