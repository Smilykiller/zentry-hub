const router = require('express').Router()
const prisma  = require('../config/db')
const auth    = require('../middleware/auth')
const { testimonialLimiter } = require('../middleware/rateLimiter')

// GET /api/testimonials — approved only (public)
router.get('/', async (req, res) => {
  try {
    const data = await prisma.testimonial.findMany({
      where:   { is_approved: true },
      orderBy: { created_at: 'desc' },
    })
    res.json(data)
  } catch (err) {
    console.error('Testimonials fetch error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/testimonials/pending — admin only
router.get('/pending', auth, async (req, res) => {
  try {
    const data = await prisma.testimonial.findMany({
      where:   { is_approved: false },
      orderBy: { created_at: 'desc' },
    })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/testimonials — public submission
router.post('/', testimonialLimiter, async (req, res) => {
  try {
    const { author_name, project_name, review_text, rating } = req.body

    if (!author_name || !project_name || !review_text) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (review_text.length < 20) {
      return res.status(400).json({ error: 'Review must be at least 20 characters' })
    }

    const ratingNum = parseInt(rating)
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' })
    }

    const item = await prisma.testimonial.create({
      data: {
        author_name:  author_name.trim(),
        project_name: project_name.trim(),
        review_text:  review_text.trim(),
        rating:       ratingNum,
        is_approved:  false,
      },
    })

    res.status(201).json({
      message: 'Review submitted. It will appear after moderation.',
      id: item.id,
    })
  } catch (err) {
    console.error('Testimonial submit error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/testimonials/:id/approve — admin only
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const item = await prisma.testimonial.update({
      where: { id: parseInt(req.params.id) },
      data:  { is_approved: true },
    })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/testimonials/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router