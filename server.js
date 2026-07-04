import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Helper to read DB
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json', error);
    return { portfolio: {} };
  }
};

// Helper to write DB
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing db.json', error);
  }
};

// GET /portfolio
app.get('/portfolio', (req, res) => {
  const db = readDB();
  res.json(db.portfolio || {});
});

// PUT /portfolio
app.put('/portfolio', (req, res) => {
  const db = readDB();
  db.portfolio = req.body;
  writeDB(db);
  res.json(db.portfolio);
});


// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  const db = readDB();
  const emailConfig = db.portfolio?.emailConfig || {};
  const user = emailConfig.user || process.env.EMAIL_USER;
  const pass = emailConfig.pass || process.env.EMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.log(`[SIMULATED EMAIL] To: ${user} | From: ${name} | Msg: ${message}`);
    return res.status(500).json({ error: 'Email credentials not configured on server' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: user,
      subject: `New Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending contact email', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// POST /api/send-otp
app.post('/api/send-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  const db = readDB();
  const emailConfig = db.portfolio?.emailConfig || {};
  const user = emailConfig.user || process.env.EMAIL_USER;
  const pass = emailConfig.pass || process.env.EMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.log(`[SIMULATED EMAIL] To: ${email} | OTP: ${otp}`);
    return res.status(500).json({ error: 'Email credentials not configured on server' });
  }

  // Security check: only send OTP to the admin's email
  const adminEmail = db.portfolio?.personal?.email;
  
  if (email !== adminEmail) {
    return res.status(403).json({ error: 'Unauthorized email address' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Admin Login" <${user}>`,
      to: email,
      subject: `Your Admin Login OTP Code`,
      text: `Your OTP code is: ${otp}\n\nThis code will expire shortly.`,
    });
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

app.listen(PORT, () => {
  console.log(`Custom Express Server running on http://localhost:${PORT}`);
});
