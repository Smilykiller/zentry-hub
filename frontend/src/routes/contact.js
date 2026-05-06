const router = require('express').Router()
const prisma = require('../config/db')
const auth   = require('../middleware/auth')
const { Resend } = require('resend')
const { contactLimiter } = require('../middleware/rateLimiter')

const resend = new Resend(process.env.RESEND_API_KEY)

// POST /api/contact — public, rate limited
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Save lead to DB
    const lead = await prisma.lead.create({
      data: { name, email, service, budget: budget || 'Not specified', message },
    })

    // Send email notification (non-blocking — don't fail the request if email fails)
    resend.emails.send({
      from:    'Zentry Hub <noreply@zentryhub.in>',
      to:      [process.env.NOTIFY_EMAIL],
      subject: `New Lead: ${name} — ${service}`,
      html: `
        <h2>New Project Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Message:</b><br>${message}</p>
        <hr>
        <p><small>Lead ID: #${lead.id} — ${new Date().toISOString()}</small></p>
      `,
    }).catch(err => console.error('Email notification failed:', err))

    res.status(201).json({ message: 'Your enquiry has been received. We will get back to you within 24 hours.' })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/leads  🔒 Admin only
router.get('/leads', auth, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { created_at: 'desc' } })
    res.json(leads)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// PUT /api/leads/:id/read  🔒 Admin only
router.put('/leads/:id/read', auth, async (req, res) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: parseInt(req.params.id) },
      data:  { is_read: true },
    })
    res.json(lead)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
