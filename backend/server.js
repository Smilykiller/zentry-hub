const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Diagnostic Check
console.log("--- SYSTEM DIAGNOSTIC ---");
console.log("Loaded Email:", process.env.EMAIL_USER);
console.log("Loaded Password Length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "UNDEFINED");
console.log("-------------------------");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up the Email Transporter (Ready for when you deploy or fix the password)
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// The Contact Form API Endpoint (CURRENTLY IN SIMULATION MODE)
app.post('/api/contact', async (req, res) => {
  const { name, email, budget, requirements } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'test@local.com',
      to: process.env.EMAIL_USER || 'test@local.com',
      subject: `Zentry Hub Lead: ${name} - ${budget}`,
      text: `
        New Client Directive Received:
        
        Identifier: ${name}
        Return Node (Email): ${email}
        Capital Allocation: ${budget}
        
        System Requirements:
        ${requirements}
      `,
    };

    // --- BYPASS: ACTUAL EMAIL SENDING IS COMMENTED OUT ---
    // await transporter.sendMail(mailOptions);

    // Simulate the email arriving in your terminal instead
    console.log("\n====== INCOMING CLIENT DIRECTIVE ======");
    console.log(`From: ${name} (${email})`);
    console.log(`Budget: ${budget}`);
    console.log(`Requirements: \n${requirements}`);
    console.log("=======================================\n");

    // Simulate a 2-second server delay so your React loading spinner shows
    setTimeout(() => {
      res.status(200).json({ message: 'Directive transmitted successfully.' });
    }, 2000);
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Server error. Transmission failed.' });
  }
});

// Start the Engine
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Zentry Hub Backend Architecture running on port ${PORT}`);
});