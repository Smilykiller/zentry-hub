require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client'); // <-- The new Postgres Engine

// Diagnostic Check 
console.log("--- SYSTEM DIAGNOSTIC ---");
console.log("Loaded Email:", process.env.EMAIL_USER);
console.log("Loaded Password Length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "UNDEFINED");
console.log("-------------------------");

// Initialize Prisma
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- EMAIL TRANSPORTER CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.log('⚠️ Email Transporter Error:', error);
  else console.log('✉️  Gmail Pipeline Ready');
});

// --- ROUTES ---

// 1. Health Check
app.get('/api/health', async (req, res) => {
  try {
    // Quick ping to Postgres to ensure it's alive
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'active', database: 'connected', message: 'Zentry Engine is operational.' });
  } catch (error) {
    res.status(500).json({ status: 'degraded', database: 'disconnected' });
  }
});

// 2. The Contact Form API Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, budget, requirements } = req.body;

  if (!name || !email || !requirements) {
    return res.status(400).json({ message: 'Name, email, and requirements are required fields.' });
  }

  try {
    // STEP 1: Save the lead to the PostgreSQL Database via Prisma
    const newLead = await prisma.lead.create({
      data: {
        name: name,
        email: email,
        budget: budget || null,
        requirements: requirements,
      }
    });

    console.log(`✅ New lead saved to Postgres ID: ${newLead.id}`);

    // STEP 2: Send the HTML Email to you
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Zentry Hub Lead: ${name} - ${budget || 'Unspecified Budget'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 30px; border-radius: 8px;">
          <h2 style="color: #C48446; border-bottom: 1px solid #333; padding-bottom: 10px;">New Client Directive Received</h2>
          <p><strong>Database ID:</strong> #${newLead.id}</p>
          <p><strong>Identifier:</strong> ${name}</p>
          <p><strong>Return Node:</strong> ${email}</p>
          <p><strong>Capital Allocation:</strong> ${budget || 'N/A'}</p>
          <h3 style="color: #C48446; margin-top: 20px;">System Requirements:</h3>
          <p style="background-color: #1a1a1a; padding: 15px; border-radius: 4px; border-left: 4px solid #C48446; line-height: 1.6; white-space: pre-wrap;">${requirements}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Directive transmitted securely.' });
    
  } catch (error) {
    console.error('Error processing directive:', error);
    res.status(500).json({ message: 'Server error. Transmission failed.' });
  }
});

// Start the Engine
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Zentry Hub Architecture [PostgreSQL Edition] running on port ${PORT}`);
});