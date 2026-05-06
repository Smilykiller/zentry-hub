const jwt    = require('jsonwebtoken')
const prisma = require('../config/db')

module.exports = async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ error: 'Unauthorised — no token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin   = await prisma.adminUser.findUnique({ where: { id: decoded.adminId } })

    if (!admin) return res.status(401).json({ error: 'Unauthorised — admin not found' })

    req.admin = admin
    next()
  } catch {
    return res.status(401).json({ error: 'Unauthorised — invalid token' })
  }
}
