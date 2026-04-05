require('dotenv').config();

// --- THE RENDER NETWORK FIX ---
// Forces Node.js to use IPv4 instead of IPv6 to prevent ENETUNREACH timeouts
require('dns').setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client'); 
const cors = require('cors');
// This tells Vercel to accept data from anywhere
app.use(cors());

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

// --- EMAIL TRANSPORTER CONFIGURATION (Upgraded for Cloud) ---
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Add these three lines to prevent Serverless TLS timeouts:
  pool: true,
  maxConnections: 1,
  maxMessages: 1,
});

transporter.verify((error) => {
  if (error) console.log('⚠️ Email Transporter Error:', error.message);
  else console.log('✉️  Gmail Pipeline Ready');
});

// --- ROUTES ---

// 1. Health Check
app.get('/api/health', async (req, res) => {
  try {
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
    // STEP 1: Save the lead to Postgres
    const newLead = await prisma.lead.create({
      data: {
        name: name,
        email: email,
        budget: budget || null,
        requirements: requirements,
      }
    });

    console.log(`✅ New lead saved to Postgres ID: ${newLead.id}`);

    // STEP 2: Send the HTML Email
    const mailOptions = {
      from: `"${name} (Zentry Hub)" <${process.env.EMAIL_USER}>`,
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
    console.log(`✅ Email dispatched for Lead ID: ${newLead.id}`);
    
    res.status(200).json({ message: 'Directive transmitted securely.' });
    
  } catch (error) {
    console.error('Error processing directive:', error);
    res.status(500).json({ message: 'Server error. Transmission failed.' });
  }
});

// --- START THE ENGINE ---
// If running locally on your laptop, use app.listen
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Zentry Hub Architecture [PostgreSQL Edition] running locally on port ${PORT}`);
  });
}

// CRITICAL FOR VERCEL: Export the Express API for Serverless execution
// --- PUBLIC ROUTE: Submit a new comment (Goes to queue) ---
app.post('/api/comments', async (req, res) => {
  try {
    const { author, text } = req.body;
    const newComment = await prisma.comment.create({
      data: { author, text } // isApproved automatically defaults to false
    });
    res.status(201).json({ message: "Comment queued for review", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit comment" });
  }
});

// --- PUBLIC ROUTE: Fetch ONLY approved comments ---
app.get('/api/comments', async (req, res) => {
  try {
    const approvedComments = await prisma.comment.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(approvedComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// --- ADMIN ROUTE: Fetch ALL comments (Queue + Approved) ---
app.get('/api/admin/comments', async (req, res) => {
  try {
    const allComments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin data" });
  }
});

// --- ADMIN ROUTE: Approve a comment ---
app.patch('/api/admin/comments/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { isApproved: true }
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to approve comment" });
  }
});

// --- ADMIN ROUTE: Delete a comment (Trash it) ---
app.delete('/api/admin/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: "Target eliminated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});
// --- PUBLIC: Fetch all projects for the 'Work' page ---
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// --- ADMIN: Add a new project ---
app.post('/api/admin/projects', async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to save project" });
  }
});

// --- ADMIN: Delete a project ---
app.delete('/api/admin/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});
module.exports = app;