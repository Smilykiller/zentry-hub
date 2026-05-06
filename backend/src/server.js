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

app.use(helmet())
app.use(cors({
  origin:      process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Zentry Hub API', time: new Date().toISOString() })
})

app.use('/api/auth',         authRoutes)
app.use('/api/projects',     projectRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api',              contactRoutes)

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`\n  🚀 Zentry Hub API → http://localhost:${PORT}`)
  console.log(`  📊 Env: ${process.env.NODE_ENV || 'development'}`)
  console.log(`  🔗 Health: http://localhost:${PORT}/health\n`)
})
