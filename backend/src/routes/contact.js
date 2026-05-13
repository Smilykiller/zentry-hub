require('dotenv').config()
const router  = require('express').Router()
const prisma  = require('../config/db')
const auth    = require('../middleware/auth')
const { contactLimiter } = require('../middleware/rateLimiter')

// Resend is optional — contact form still saves to DB even without it
let resend = null
try {
  const { Resend } = require('resend')
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder') {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
} catch (e) {
  console.warn('Resend not configured — emails disabled')
}

// POST /api/contact
router.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, service, message' })
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message too short' })
    }

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        name:    name.trim(),
        email:   email.trim().toLowerCase(),
        service: service.trim(),
        budget:  budget?.trim() || 'Not specified',
        message: message.trim(),
      },
    })

    console.log(`New lead #${lead.id}: ${name} — ${service}`)

    // Send email notification (non-blocking — don't fail if email fails)
    if (resend && process.env.NOTIFY_EMAIL) {
      resend.emails.send({
        from:    'Zentry Hub <onboarding@resend.dev>',
        to:      [process.env.NOTIFY_EMAIL],
        subject: `New Lead: ${name} — ${service}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#C4843A">New Project Enquiry</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0"><strong>${name}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666">Service</td><td style="padding:8px 0">${service}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Budget</td><td style="padding:8px 0">${budget || 'Not specified'}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-left:3px solid #C4843A">
              <strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}
            </div>
            <p style="color:#999;font-size:12px;margin-top:20px">Lead #${lead.id} · ${new Date().toISOString()}</p>
          </div>
        `,
      }).catch(err => console.error('Email notification failed:', err.message))
    }

    res.status(201).json({
      message: 'Enquiry received. We will respond within 24 hours.',
      id: lead.id,
    })

  } catch (err) {
    console.error('Contact route error:', err.message)
    res.status(500).json({ error: 'Server error — please try again later' })
  }
})

// GET /api/leads — admin only
router.get('/leads', auth, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { created_at: 'desc' },
    })
    res.json(leads)
  } catch (err) {
    console.error('Leads fetch error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/leads/:id/read — admin only
router.put('/leads/:id/read', auth, async (req, res) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: parseInt(req.params.id) },
      data:  { is_read: true },
    })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router