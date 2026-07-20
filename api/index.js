import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { kv } from '@vercel/kv';

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "OPTIONS"],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));

// Helper to read DB from KV
const readDB = async () => {
  try {
    const data = await kv.get('portfolio_db');
    return data || { portfolio: {} };
  } catch (error) {
    console.error('Error reading from KV', error);
    return { portfolio: {} };
  }
};

// Helper to write DB to KV
const writeDB = async (data) => {
  try {
    await kv.set('portfolio_db', data);
  } catch (error) {
    console.error('Error writing to KV', error);
  }
};

// GET /api/portfolio
app.get('/api/portfolio', async (req, res) => {
  const db = await readDB();
  res.json(db.portfolio || {});
});

// PUT /api/portfolio
app.put('/api/portfolio', async (req, res) => {
  const db = await readDB();
  db.portfolio = req.body;
  await writeDB(db);
  res.json(db.portfolio);
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  const db = await readDB();
  const emailConfig = db.portfolio?.emailConfig || {};
  const user = emailConfig.user || process.env.EMAIL_USER;
  const pass = emailConfig.pass || process.env.EMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.log(`[SIMULATED EMAIL] To: ${user} | From: ${name} | Msg: ${message}`);
    return res.status(500).json({ error: 'Email credentials not configured on server' });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
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
  
  const db = await readDB();
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

export default app;
