const express = require('express');
const initSqlJs = require('sql.js');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Database Setup ─────────────────────────────────────────────────────────
let db;

async function initDb() {
  const SQL = await initSqlJs();
  const dbPath = path.join(__dirname, 'plantglow.db');
  
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }
  
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    google_id TEXT UNIQUE,
    name TEXT,
    token TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS early_access_emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS verification_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  saveDb();
  console.log('📦 SQLite (sql.js) connected to plantglow.db');
}

function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(path.join(__dirname, 'plantglow.db'), buffer);
}

// ─── Email (Resend) Setup ───────────────────────────────────────────────────
const resend = new Resend('re_YoKAhdaE_8mTNeqosuCo9PVTRVx4oWH1q');

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

// ─── Helpers ────────────────────────────────────────────────────────────────
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function dbGet(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

function dbRun(sql, params = []) {
  db.run(sql, params);
  saveDb();
}

function dbAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  const row = dbGet('SELECT * FROM users WHERE token = ?', [token]);
  if (!row) return res.status(401).json({ error: 'Unauthorized' });
  req.user = row;
  next();
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  const row = dbGet('SELECT * FROM admin_sessions WHERE token = ?', [token]);
  if (!row || new Date() > new Date(row.expires_at)) {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }
  req.adminId = row.admin_id;
  next();
}

// ─── User Auth Routes ───────────────────────────────────────────────────────

// POST /api/auth/check-email - Check if email already registered
app.post('/api/auth/check-email', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const row = dbGet('SELECT id, google_id FROM users WHERE email = ?', [email]);
  if (!row) return res.json({ exists: false });
  res.json({ exists: true, googleOnly: !!row.google_id });
});

// POST /api/auth/register - Send verification code
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  dbRun(`INSERT OR REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`,
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
    res.json({ success: true, message: 'Verification code sent!' });
  } catch (emailErr) {
    console.error('Email send error:', emailErr);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// POST /api/auth/verify-register - Verify code and create account
app.post('/api/auth/verify-register', (req, res) => {
  const { email, password, code } = req.body;
  if (!email || !password || !code) return res.status(400).json({ error: 'All fields required' });

  const row = dbGet('SELECT * FROM verification_codes WHERE email = ? AND code = ? AND expires_at > ?',
    [email, code, new Date().toISOString()]);
  if (!row) return res.status(400).json({ error: 'Invalid or expired code' });

  const hash = hashPassword(password);
  const token = crypto.randomBytes(32).toString('hex');

  dbRun('INSERT INTO users (email, password_hash, token, created_at) VALUES (?, ?, ?, ?)',
    [email, hash, token, new Date().toISOString()]);
  
  const userId = dbGet('SELECT last_insert_rowid() as id').id;
  dbRun('DELETE FROM verification_codes WHERE email = ?', [email]);
  res.json({ success: true, token, user: { id: userId, email } });
});

// POST /api/auth/resend-code - Resend verification code
app.post('/api/auth/resend-code', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  dbRun(`INSERT OR REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`,
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
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const hash = hashPassword(password);
  const row = dbGet('SELECT * FROM users WHERE email = ? AND password_hash = ?', [email, hash]);
  if (!row) return res.status(401).json({ error: 'Invalid email or password' });

  const token = crypto.randomBytes(32).toString('hex');
  dbRun('UPDATE users SET token = ? WHERE id = ?', [token, row.id]);
  res.json({ success: true, token, user: { id: row.id, email: row.email, name: row.name } });
});

// POST /api/auth/google - Google OAuth login/register
app.post('/api/auth/google', (req, res) => {
  const { idToken, name, email } = req.body;
  if (!idToken) return res.status(400).json({ error: 'No token provided' });

  const token = crypto.randomBytes(32).toString('hex');
  const existingRow = dbGet('SELECT * FROM users WHERE email = ? OR google_id = ?', [email, idToken]);

  if (existingRow) {
    dbRun('UPDATE users SET google_id = ?, token = ?, name = ? WHERE id = ?',
      [idToken, token, name || existingRow.name, existingRow.id]);
    return res.json({ success: true, token, user: { id: existingRow.id, email: existingRow.email, name: name || existingRow.name } });
  }

  const userEmail = email || `google_${idToken.slice(0, 8)}@unknown.com`;
  const userName = name || userEmail.split('@')[0];
  dbRun('INSERT INTO users (email, google_id, name, token, created_at) VALUES (?, ?, ?, ?, ?)',
    [userEmail, idToken, userName, token, new Date().toISOString()]);
  const userId = dbGet('SELECT last_insert_rowid() as id').id;
  res.json({ success: true, token, user: { id: userId, email: userEmail, name: userName } });
});

// GET /api/auth/me - Get current user
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  const row = dbGet('SELECT id, email, name FROM users WHERE token = ?', [token]);
  if (!row) return res.status(401).json({ error: 'Invalid token' });
  res.json({ user: row });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    dbRun('UPDATE users SET token = NULL WHERE token = ?', [token]);
  }
  res.json({ success: true });
});

// ─── Early Access Email Capture ─────────────────────────────────────
app.post('/api/early-access', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  try {
    dbRun('INSERT OR IGNORE INTO early_access_emails (email) VALUES (?)', [email]);
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

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hash = hashPassword(password);
  const row = dbGet('SELECT * FROM admin_users WHERE email = ? AND password_hash = ?', [email, hash]);
  if (!row) return res.status(401).json({ error: 'Invalid credentials' });
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  dbRun('INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)', [row.id, token, expiresAt]);
  res.json({ success: true, token, admin: { id: row.id, email: row.email, name: row.name } });
});

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  dbRun('DELETE FROM admin_sessions WHERE token = ?', [token]);
  res.json({ success: true });
});

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const totalUsers = dbGet('SELECT COUNT(*) as total FROM users').total;
  const newToday = dbGet("SELECT COUNT(*) as total FROM users WHERE date(created_at) = date('now')").total;
  const earlyAccessCount = dbGet('SELECT COUNT(*) as total FROM early_access_emails').total;
  const recentUsers = dbAll("SELECT email, name, created_at FROM users ORDER BY created_at DESC LIMIT 50");
  const earlyAccessList = dbAll("SELECT email, created_at FROM early_access_emails ORDER BY created_at DESC");
  res.json({ total_users: totalUsers, new_today: newToday, early_access_count: earlyAccessCount, recent_users: recentUsers, early_access_list: earlyAccessList });
});

app.post('/api/admin/create-admin', requireAdmin, (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hash = hashPassword(password);
  dbRun('INSERT OR REPLACE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name || 'Admin']);
  res.json({ success: true, message: 'Admin account created' });
});

app.get('/api/admin/export/users', requireAdmin, (req, res) => {
  const rows = dbAll("SELECT email, name, created_at FROM users ORDER BY created_at DESC");
  let csv = 'Email,Name,Registered At\n';
  rows.forEach(r => { csv += `"${r.email || ''}","${r.name || ''}","${r.created_at}"\n`; });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=plantglow-users.csv');
  res.send(csv);
});

app.get('/api/admin/export/emails', requireAdmin, (req, res) => {
  const rows = dbAll("SELECT email, created_at FROM early_access_emails ORDER BY created_at DESC");
  let csv = 'Email,Signed Up At\n';
  rows.forEach(r => { csv += `"${r.email}","${r.created_at}"\n`; });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=plantglow-early-access.csv');
  res.send(csv);
});

// ─── Start Server ───────────────────────────────────────────────────────────
initDb().then(() => {
  // TEMP: Create admin endpoint (remove after use)
  app.get('/api/debug/create-admin', (req, res) => {
    const secret = req.query.secret;
    if (secret !== 'plantglow-admin-2026') return res.status(403).json({ error: 'Invalid secret' });
    const hash = crypto.createHash('sha256').update('plantglow123').digest('hex');
    db.run('INSERT OR REPLACE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)', ['admin@plantglow.com', hash, 'Test Admin']);
    res.json({ success: true, message: 'Admin created: admin@plantglow.com / plantglow123' });
  });

  app.listen(PORT, () => {
    console.log(`\n🚀 PlantGlow backend running at http://localhost:${PORT}`);
    console.log(`📱 Frontend at http://localhost:${PORT}/index.html`);
    console.log(`🔐 Admin at http://localhost:${PORT}/admin.html\n`);
  });
}).catch(err => {
  console.error('Failed to init DB:', err);
  process.exit(1);
});
