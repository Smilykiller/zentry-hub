const jwt    = require('jsonwebtoken')
const prisma = require('../config/db')

module.exports = async function authMiddleware(req, res, next) {
  try {
    // Get token from cookie
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).json({ error: 'Unauthorised — no token' })
    }

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
      return res.status(401).json({ error: 'Unauthorised — invalid or expired token' })
    }

    // Find admin
    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.adminId },
      select: { id: true, email: true, created_at: true },
    })

    if (!admin) {
      return res.status(401).json({ error: 'Unauthorised — admin not found' })
    }

    req.admin = admin
    next()

  } catch (err) {
    console.error('Auth middleware error:', err.message)
    return res.status(500).json({ error: 'Server error in auth check' })
  }
}