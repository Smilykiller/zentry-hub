const router = require('express').Router()
const prisma = require('../config/db')
const auth   = require('../middleware/auth')
const { testimonialLimiter } = require('../middleware/rateLimiter')

router.get('/', async (req, res) => {
  try {
    const data = await prisma.testimonial.findMany({ where: { is_approved: true }, orderBy: { created_at: 'desc' } })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.get('/pending', auth, async (req, res) => {
  try {
    const data = await prisma.testimonial.findMany({ where: { is_approved: false }, orderBy: { created_at: 'desc' } })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', testimonialLimiter, async (req, res) => {
  try {
    const { author_name, project_name, review_text, rating } = req.body
    const item = await prisma.testimonial.create({
      data: { author_name, project_name, review_text, rating: parseInt(rating) || 5 },
    })
    res.status(201).json({ message: 'Review submitted for moderation', id: item.id })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.put('/:id/approve', auth, async (req, res) => {
  try {
    const item = await prisma.testimonial.update({ where: { id: parseInt(req.params.id) }, data: { is_approved: true } })
    res.json(item)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
