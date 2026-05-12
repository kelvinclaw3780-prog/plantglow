const express = require('express');
const { createClient } = require('@libsql/client');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { Resend } = require('resend');
const admin = require('firebase-admin');

// ─── Firebase Admin Setup ───────────────────────────────────────────────────
let firebaseInitialized = false;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    firebaseInitialized = true;
    console.log('🔥 Firebase Admin initialized');
  } else {
    console.log('⚠️ FIREBASE_SERVICE_ACCOUNT not set - Google sign-in will not work');
  }
} catch (err) {
  console.error('Firebase Admin init failed:', err.message);
}

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Database Setup ─────────────────────────────────────────────────────────
const dbUrl = process.env.TURSO_DATABASE_URL || 'libsql://plantglow-kelvinclaw3780-prog.aws-ap-northeast-1.turso.io';
const dbAuthToken = process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzg1NTYwMzEsImlkIjoiMDE5ZTFhMzItYTQwMS03ZjQ1LTg1Y2EtNWYwZDAyNWI3NWQ1IiwicmlkIjoiMDg0NTcxY2YtZmEyOS00ZDcyLTlkMWEtODBlZGNlZmVlZDQzIn0.bUU8V207GHIdCZFVLGX0a2WAkT4dLSBNX7J3AY2QmSCnnvgRZFXS-oMbHQH0vDE8sH3OMl6esxGdl43fnNZYBg';
let db;

function initDb() {
  db = createClient({ url: dbUrl, authToken: dbAuthToken });
  // Create tables if not exist
  db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      google_id TEXT UNIQUE,
      name TEXT,
      token TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS early_access_emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS password_reset_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('📦 Turso connected:', dbUrl);
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function dbGet(sql, params = []) {
  const result = await db.execute({ sql, args: params });
  if (result.rows.length > 0) {
    const cols = result.columns;
    const vals = result.rows[0];
    const row = {};
    cols.forEach((c, i) => { row[c] = vals[i]; });
    return row;
  }
  return null;
}

async function dbRun(sql, params = []) {
  await db.execute({ sql, args: params });
}

async function dbAll(sql, params = []) {
  const result = await db.execute({ sql, args: params });
  return result.rows.map(row => {
    const cols = result.columns;
    const obj = {};
    cols.forEach((c, i) => { obj[c] = row[i]; });
    return obj;
  });
}

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  const row = await dbGet('SELECT * FROM users WHERE token = ?', [token]);
  if (!row) return res.status(401).json({ error: 'Unauthorized' });
  req.user = row;
  next();
}

async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  const row = await dbGet('SELECT * FROM admin_sessions WHERE token = ?', [token]);
  if (!row || new Date() > new Date(row.expires_at)) {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }
  req.adminId = row.admin_id;
  next();
}

// ─── Email (Resend) Setup ───────────────────────────────────────────────────
const resend = new Resend('re_YoKAhdaE_8mTNeqosuCo9PVTRVx4oWH1q');

// ─── Security Headers ─────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

// ─── User Auth Routes ────────────────────────────────────────────────────────

// POST /api/auth/check-email - Check if email already registered
app.post('/api/auth/check-email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const row = await dbGet('SELECT id, google_id FROM users WHERE email = ?', [email]);
  if (!row) return res.json({ exists: false });
  res.json({ exists: true, googleOnly: !!row.google_id });
});

// POST /api/auth/register - Send verification code (step 1 of registration)
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  // Check if email already registered (any method)
  const existing = await dbGet('SELECT id, google_id FROM users WHERE email = ?', [email]);
  if (existing) {
    if (existing.google_id) return res.status(400).json({ error: 'This email uses Google sign-in. Please tap "Continue with Google" instead.' });
    return res.status(400).json({ error: 'This email is already registered. Please sign in instead.' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  await dbRun(`INSERT OR REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`,
    [email, code, expiresAt]);

  try {
    await resend.emails.send({
      from: 'PlantGlow <cs@plantglow.net>',
      to: email,
      subject: 'Your PlantGlow verification code',
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #166534;">🌿 Welcome to PlantGlow!</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #166534; padding: 20px; background: #f0fdf4; border-radius: 8px; text-align: center; margin: 20px 0;">${code}</div>
          <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
        </div>
      `
    });
    res.json({ success: true, message: 'Verification code sent!', email });
  } catch (emailErr) {
    console.error('Email send error:', emailErr);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// POST /api/auth/verify-register - Verify code and create account
app.post('/api/auth/verify-register', async (req, res) => {
  const { email, password, code } = req.body;
  if (!email || !password || !code) return res.status(400).json({ error: 'All fields required' });

  const row = await dbGet('SELECT * FROM verification_codes WHERE email = ? AND code = ? AND expires_at > ?',
    [email, code, new Date().toISOString()]);
  if (!row) return res.status(400).json({ error: 'Invalid or expired code' });

  const hash = hashPassword(password);
  const token = crypto.randomBytes(32).toString('hex');

  await dbRun('INSERT INTO users (email, password_hash, token, created_at) VALUES (?, ?, ?, ?)',
    [email, hash, token, new Date().toISOString()]);
  
  const user = await dbGet('SELECT id, email FROM users WHERE email = ?', [email]);
  await dbRun('DELETE FROM verification_codes WHERE email = ?', [email]);
  res.json({ success: true, token, user: { id: user.id, email: user.email } });
});

// POST /api/auth/resend-code - Resend verification code
app.post('/api/auth/resend-code', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  await dbRun(`INSERT OR REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`,
    [email, code, expiresAt]);

  try {
    await resend.emails.send({
      from: 'PlantGlow <cs@plantglow.net>',
      to: email,
      subject: 'Your PlantGlow verification code (resent)',
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #166534;">🌿 PlantGlow</h2>
          <p>Your new verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #166534; padding: 20px; background: #f0fdf4; border-radius: 8px; text-align: center; margin: 20px 0;">${code}</div>
          <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
        </div>
      `
    });
    res.json({ success: true, message: 'Code resent!' });
  } catch (emailErr) {
    console.error('Email error:', emailErr);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// POST /api/auth/login - Email/password login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const hash = hashPassword(password);
  const row = await dbGet('SELECT * FROM users WHERE email = ? AND password_hash = ?', [email, hash]);
  if (!row) return res.status(401).json({ error: 'Invalid email or password' });

  const token = crypto.randomBytes(32).toString('hex');
  await dbRun('UPDATE users SET token = ? WHERE id = ?', [token, row.id]);
  res.json({ success: true, token, user: { id: row.id, email: row.email, name: row.name } });
});

// POST /api/auth/google - Google OAuth login/register
app.post('/api/auth/google', async (req, res) => {
  const { idToken, name, email } = req.body;
  if (!idToken) return res.status(400).json({ error: 'No token provided' });

  // Verify the Google idToken with Firebase Admin
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    console.error('Google token verification FAILED:', err.message);
    console.error('Token prefix:', idToken ? idToken.substring(0, 50) : 'NULL');
    return res.status(401).json({ error: 'Invalid or expired Google token. Please try again.', details: err.message });
  }

  const googleEmail = decodedToken.email;
  const googleName = decodedToken.name || name || googleEmail.split('@')[0];
  const token = crypto.randomBytes(32).toString('hex');

  // Try to find existing user by google_id or email
  const existingRow = await dbGet('SELECT * FROM users WHERE email = ? OR google_id = ?', [googleEmail, idToken]);

  if (existingRow) {
    await dbRun('UPDATE users SET google_id = ?, token = ?, name = ? WHERE id = ?',
      [idToken, token, googleName || existingRow.name, existingRow.id]);
    return res.json({ success: true, token, user: { id: existingRow.id, email: existingRow.email, name: googleName || existingRow.name } });
  }

  await dbRun('INSERT INTO users (email, google_id, name, token, created_at) VALUES (?, ?, ?, ?, ?)',
    [googleEmail, idToken, googleName, token, new Date().toISOString()]);
  const newUser = await dbGet('SELECT id, email, name FROM users WHERE email = ?', [googleEmail]);
  res.json({ success: true, token, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
});

// GET /api/auth/me - Get current user
app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  const row = await dbGet('SELECT id, email, name FROM users WHERE token = ?', [token]);
  if (!row) return res.status(401).json({ error: 'Invalid token' });
  res.json({ user: row });
});

// POST /api/auth/logout
app.post('/api/auth/logout', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    await dbRun('UPDATE users SET token = NULL WHERE token = ?', [token]);
  }
  res.json({ success: true });
});

// ─── Forgot Password ───────────────────────────────────────────────────────
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_12345678';
const FROM_EMAIL = 'PlantGlow <cs@plantglow.net>';

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendEmail(to, subject, html) {
  // Uses Resend API - fails silently in test/dev
  if (!RESEND_API_KEY || RESEND_API_KEY === 're_placeholder') return;
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html })
  }).catch(() => {});
}

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  const row = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
  if (!row) {
    // Security: don't reveal if email exists
    return res.json({ success: true, message: 'If that email exists, a reset code has been sent.' });
  }
  const code = generateCode();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  await dbRun('DELETE FROM password_reset_codes WHERE email = ?', [email]);
  await dbRun('INSERT INTO password_reset_codes (email, code, expires_at) VALUES (?, ?, ?)', [email, code, expiresAt]);
  sendEmail(email, 'PlantGlow Password Reset Code', `<p>Your PlantGlow password reset code is: <b>${code}</b></p><p>This expires in 30 minutes.</p>`);
  res.json({ success: true, message: 'If that email exists, a reset code has been sent.' });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { email, code, password } = req.body;
  if (!email || !code || !password) return res.status(400).json({ error: 'All fields required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  const row = await dbGet('SELECT * FROM password_reset_codes WHERE email = ? AND code = ? AND expires_at > datetime("now")', [email, code]);
  if (!row) return res.status(400).json({ error: 'Invalid or expired reset code' });
  const hash = hashPassword(password);
  await dbRun('UPDATE users SET password_hash = ? WHERE email = ?', [hash, email]);
  await dbRun('DELETE FROM password_reset_codes WHERE email = ?', [email]);
  res.json({ success: true });
});

// ─── Early Access Email Capture ────────────────────────────────────────────
app.post('/api/early-access', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  try {
    await dbRun('INSERT OR IGNORE INTO early_access_emails (email) VALUES (?)', [email]);
    res.json({ success: true, message: 'You\'re on the list! We\'ll be in touch soon 🌿' });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      res.json({ success: true, message: 'You\'re already on the list!' });
    } else {
      res.status(500).json({ error: 'Failed to subscribe' });
    }
  }
});

// ─── Admin Routes ──────────────────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hash = hashPassword(password);
  const row = await dbGet('SELECT * FROM admin_users WHERE email = ? AND password_hash = ?', [email, hash]);
  if (!row) return res.status(401).json({ error: 'Invalid credentials' });
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await dbRun('INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)', [row.id, token, expiresAt]);
  res.json({ success: true, token, admin: { id: row.id, email: row.email, name: row.name } });
});

app.post('/api/admin/logout', requireAdmin, async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  await dbRun('DELETE FROM admin_sessions WHERE token = ?', [token]);
  res.json({ success: true });
});

app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  const totalUsers = await dbGet('SELECT COUNT(*) as total FROM users');
  const newToday = await dbGet("SELECT COUNT(*) as total FROM users WHERE date(created_at) = date('now')");
  const earlyAccessCount = await dbGet('SELECT COUNT(*) as total FROM early_access_emails');
  const recentUsers = await dbAll("SELECT email, name, created_at FROM users ORDER BY created_at DESC LIMIT 50");
  const earlyAccessList = await dbAll("SELECT email, created_at FROM early_access_emails ORDER BY created_at DESC");
  res.json({ total_users: totalUsers.total, new_today: newToday.total, early_access_count: earlyAccessCount.total, recent_users: recentUsers, early_access_list: earlyAccessList });
});

app.post('/api/admin/create-admin', requireAdmin, async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hash = hashPassword(password);
  await dbRun('INSERT OR REPLACE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name || 'Admin']);
  res.json({ success: true, message: 'Admin account created' });
});

app.get('/api/admin/export/users', requireAdmin, async (req, res) => {
  const rows = await dbAll("SELECT email, name, created_at FROM users ORDER BY created_at DESC");
  let csv = 'Email,Name,Registered At\n';
  rows.forEach(r => { csv += `"${r.email || ''}","${r.name || ''}","${r.created_at}"\n`; });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=plantglow-users.csv');
  res.send(csv);
});

app.get('/api/admin/export/emails', requireAdmin, async (req, res) => {
  const rows = await dbAll("SELECT email, created_at FROM early_access_emails ORDER BY created_at DESC");
  let csv = 'Email,Signed Up At\n';
  rows.forEach(r => { csv += `"${r.email}","${r.created_at}"\n`; });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=plantglow-early-access.csv');
  res.send(csv);
});

// ─── Start Server ───────────────────────────────────────────────────────────
initDb();

app.listen(PORT, () => {
  console.log(`\n🚀 PlantGlow backend running at http://localhost:${PORT}`);
  console.log(`📱 Frontend at http://localhost:${PORT}/index.html`);
  console.log(`🔐 Admin at http://localhost:${PORT}/admin.html\n`);
});
