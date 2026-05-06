const router = require('express').Router()
const prisma = require('../config/db')
const auth   = require('../middleware/auth')
const { Resend } = require('resend')
const { contactLimiter } = require('../middleware/rateLimiter')

const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const lead = await prisma.lead.create({
      data: { name, email, service, budget: budget || 'Not specified', message },
    })

    // Non-blocking email notification
    resend.emails.send({
      from:    'Zentry Hub <noreply@zentryhub.in>',
      to:      [process.env.NOTIFY_EMAIL],
      subject: `New Lead: ${name} — ${service}`,
      html:    `<h2>New Enquiry</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Service:</b> ${service}</p><p><b>Budget:</b> ${budget}</p><p><b>Message:</b><br>${message}</p>`,
    }).catch(err => console.error('Email failed:', err))

    res.status(201).json({ message: 'Enquiry received. We will respond within 24 hours.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/leads', auth, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { created_at: 'desc' } })
    res.json(leads)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.put('/leads/:id/read', auth, async (req, res) => {
  try {
    const lead = await prisma.lead.update({ where: { id: parseInt(req.params.id) }, data: { is_read: true } })
    res.json(lead)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
