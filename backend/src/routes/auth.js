const router   = require('express').Router()
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const prisma   = require('../config/db')
const auth     = require('../middleware/auth')
const { loginLimiter } = require('../middleware/rateLimiter')

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: email.trim().toLowerCase() },
    })

    // Compare password — always run bcrypt to prevent timing attacks
    const valid = admin
      ? await bcrypt.compare(password, admin.password_hash)
      : await bcrypt.compare(password, '$2b$12$invalidhashfortimingnnnnnnnnnnnnnnnnnnnnnnnnn')

    if (!admin || !valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Sign JWT
    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    const isProd = process.env.NODE_ENV === 'production'

    // Set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure:   isProd,
      sameSite: isProd ? 'none' : 'lax',  // 'none' required for cross-site on Vercel
      maxAge:   7 * 24 * 60 * 60 * 1000,  // 7 days in ms
      path:     '/',
    })

    // Update last login
    await prisma.adminUser.update({
      where: { id: admin.id },
      data:  { last_login: new Date() },
    })

    console.log(`Admin login: ${admin.email}`)

    res.json({ id: admin.id, email: admin.email })

  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path:     '/',
  })
  res.json({ message: 'Logged out' })
})

// GET /api/auth/me — verify token
router.get('/me', auth, (req, res) => {
  res.json({ id: req.admin.id, email: req.admin.email })
})

module.exports = router