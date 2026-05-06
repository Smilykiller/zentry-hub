const router  = require('express').Router()
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const prisma  = require('../config/db')
const auth    = require('../middleware/auth')
const { loginLimiter } = require('../middleware/rateLimiter')

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const admin = await prisma.adminUser.findUnique({ where: { email } })
    const valid = admin && await bcrypt.compare(password, admin.password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge:   7 * 24 * 60 * 60 * 1000,
    })

    await prisma.adminUser.update({
      where: { id: admin.id },
      data:  { last_login: new Date() },
    })

    res.json({ id: admin.id, email: admin.email })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/logout', auth, (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
})

router.get('/me', auth, (req, res) => {
  res.json({ id: req.admin.id, email: req.admin.email })
})

module.exports = router
