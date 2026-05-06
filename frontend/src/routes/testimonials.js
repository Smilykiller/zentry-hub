const router = require('express').Router()
const prisma = require('../config/db')
const auth   = require('../middleware/auth')
const { testimonialLimiter } = require('../middleware/rateLimiter')

// GET /api/testimonials — approved only
router.get('/', async (req, res) => {
  try {
    const data = await prisma.testimonial.findMany({
      where:   { is_approved: true },
      orderBy: { created_at: 'desc' },
    })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// GET /api/testimonials/pending  🔒 Admin only
router.get('/pending', auth, async (req, res) => {
  try {
    const data = await prisma.testimonial.findMany({
      where:   { is_approved: false },
      orderBy: { created_at: 'desc' },
    })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// POST /api/testimonials — public submission
router.post('/', testimonialLimiter, async (req, res) => {
  try {
    const { author_name, project_name, review_text, rating } = req.body
    const item = await prisma.testimonial.create({
      data: { author_name, project_name, review_text, rating: parseInt(rating) || 5 },
    })
    res.status(201).json({ message: 'Review submitted for moderation', id: item.id })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// PUT /api/testimonials/:id/approve  🔒 Admin only
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const item = await prisma.testimonial.update({
      where: { id: parseInt(req.params.id) },
      data:  { is_approved: true },
    })
    res.json(item)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// DELETE /api/testimonials/:id  🔒 Admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Testimonial deleted' })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
