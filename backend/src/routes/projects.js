const router = require('express').Router()
const prisma = require('../config/db')
const auth   = require('../middleware/auth')
const { upload } = require('../config/cloudinary')

router.get('/', async (req, res) => {
  try {
    const where = {}
    if (req.query.category)       where.category   = req.query.category
    if (req.query.featured === 'true') where.is_featured = true
    const projects = await prisma.project.findMany({ where, orderBy: { display_order: 'asc' } })
    res.json(projects)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!project) return res.status(404).json({ error: 'Not found' })
    res.json(project)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, category, description, live_url, github_url, is_featured, display_order } = req.body
    const tech_stack = JSON.parse(req.body.tech_stack || '[]')
    const project = await prisma.project.create({
      data: {
        title, category, description, tech_stack,
        image_url:     req.file?.path || '',
        live_url:      live_url   || null,
        github_url:    github_url || null,
        is_featured:   is_featured === 'true',
        display_order: parseInt(display_order) || 0,
      },
    })
    res.status(201).json(project)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data:  req.body,
    })
    res.json(project)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
