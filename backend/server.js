const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Database Setup ─────────────────────────────────────────────────────────
const db = new sqlite3.Database(path.join(__dirname, 'plantglow.db'), (err) => {
  if (err) console.error('DB connection error:', err);
  else console.log('📦 SQLite connected to plantglow.db');
});

// ─── Email (Resend) Setup ───────────────────────────────────────────────────
const resend = new Resend('re_YoKAhdaE_8mTNeqosuCo9PVTRVx4oWH1q');

db.serialize(() => {
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
});

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// ─── Helpers ────────────────────────────────────────────────────────────────
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  db.get('SELECT * FROM users WHERE token = ?', [token], (err, row) => {
    if (!row) return res.status(401).json({ error: 'Unauthorized' });
    req.user = row;
    next();
  });
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  db.get('SELECT * FROM admin_sessions WHERE token = ?', [token], (err, row) => {
    if (!row || new Date() > new Date(row.expires_at)) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }
    req.adminId = row.admin_id;
    next();
  });
}

// ─── User Auth Routes ───────────────────────────────────────────────────────

// POST /api/auth/check-email - Check if email already registered
app.post('/api/auth/check-email', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  
  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    res.json({ exists: !!row });
  });
});

// POST /api/auth/register - Send verification code
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

  // Store or update verification code
  db.run(`INSERT OR REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`,
    [email, code, expiresAt], async function(err) {
    if (err) return res.status(500).json({ error: 'Failed to store verification code' });

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
});

// POST /api/auth/verify-register - Verify code and create account
app.post('/api/auth/verify-register', (req, res) => {
  const { email, password, code } = req.body;
  if (!email || !password || !code) return res.status(400).json({ error: 'All fields required' });

  db.get('SELECT * FROM verification_codes WHERE email = ? AND code = ? AND expires_at > ?',
    [email, code, new Date().toISOString()], (err, row) => {
    if (!row) return res.status(400).json({ error: 'Invalid or expired code' });

    const hash = hashPassword(password);
    const token = crypto.randomBytes(32).toString('hex');

    db.run('INSERT INTO users (email, password_hash, token, created_at) VALUES (?, ?, ?, ?)',
      [email, hash, token, new Date().toISOString()], function(insErr) {
        if (insErr) {
          if (insErr.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Email already registered' });
          }
          return res.status(500).json({ error: 'Registration failed' });
        }
        db.run('DELETE FROM verification_codes WHERE email = ?', [email]);
        res.json({ success: true, token, user: { id: this.lastID, email } });
      });
  });
});

// POST /api/auth/resend-code - Resend verification code
app.post('/api/auth/resend-code', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  db.run(`INSERT OR REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`,
    [email, code, expiresAt], async function(err) {
    if (err) return res.status(500).json({ error: 'Failed to store code' });

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
});

// POST /api/auth/login - Email/password login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const hash = hashPassword(password);
  db.get('SELECT * FROM users WHERE email = ? AND password_hash = ?', [email, hash], (err, row) => {
    if (!row) return res.status(401).json({ error: 'Invalid email or password' });

    const token = crypto.randomBytes(32).toString('hex');
    db.run('UPDATE users SET token = ? WHERE id = ?', [token, row.id]);
    res.json({ success: true, token, user: { id: row.id, email: row.email, name: row.name } });
  });
});

// POST /api/auth/google - Google OAuth login/register
app.post('/api/auth/google', (req, res) => {
  const { idToken, name, email } = req.body;
  if (!idToken) return res.status(400).json({ error: 'No token provided' });

  // TODO: Verify idToken with Google
  // For now, check if user exists by email or google_id
  const token = crypto.randomBytes(32).toString('hex');

  // Try to find existing user
  db.get('SELECT * FROM users WHERE email = ? OR google_id = ?', [email, idToken], (err, row) => {
    if (row) {
      // Update google_id and token
      db.run('UPDATE users SET google_id = ?, token = ?, name = ? WHERE id = ?', 
        [idToken, token, name || row.name, row.id]);
      return res.json({ success: true, token, user: { id: row.id, email: row.email, name: name || row.name } });
    }

    // Create new user
    const userEmail = email || `google_${idToken.slice(0, 8)}@unknown.com`;
    const userName = name || userEmail.split('@')[0];
    db.run('INSERT INTO users (email, google_id, name, token, created_at) VALUES (?, ?, ?, ?, ?)',
      [userEmail, idToken, userName, token, new Date().toISOString()], function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create account' });
      res.json({ success: true, token, user: { id: this.lastID, email: userEmail, name: userName } });
    });
  });
});

// GET /api/auth/me - Get current user
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  db.get('SELECT id, email, name FROM users WHERE token = ?', [token], (err, row) => {
    if (!row) return res.status(401).json({ error: 'Invalid token' });
    res.json({ user: row });
  });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    db.run('UPDATE users SET token = NULL WHERE token = ?', [token]);
  }
  res.json({ success: true });
});

// ─── Early Access Email Capture ─────────────────────────────────────
app.post('/api/early-access', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  db.run('INSERT OR IGNORE INTO early_access_emails (email) VALUES (?)', [email], function(err) {
    if (err && err.message.includes('UNIQUE')) {
      return res.json({ success: true, message: 'You\'re already on the list!' });
    }
    res.json({ success: true, message: 'You\'re on the list! We\'ll be in touch soon 🌿' });
  });
});

// ─── Admin Routes ──────────────────────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hash = hashPassword(password);
  db.get('SELECT * FROM admin_users WHERE email = ? AND password_hash = ?', [email, hash], (err, row) => {
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    db.run('INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)', [row.id, token, expiresAt]);
    res.json({ success: true, token, admin: { id: row.id, email: row.email, name: row.name } });
  });
});

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  db.run('DELETE FROM admin_sessions WHERE token = ?', [token]);
  res.json({ success: true });
});

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const stats = {};
  db.get('SELECT COUNT(*) as total FROM users', (err, row) => {
    stats.total_users = row.total;
    db.get("SELECT COUNT(*) as total FROM users WHERE date(created_at) = date('now')", (err2, row2) => {
      stats.new_today = row2.total;
      db.get('SELECT COUNT(*) as total FROM early_access_emails', (err3, row3) => {
        stats.early_access_count = row3.total;
        db.all("SELECT email, name, created_at FROM users ORDER BY created_at DESC LIMIT 50", (err4, rows) => {
          stats.recent_users = rows;
          db.all("SELECT email, created_at FROM early_access_emails ORDER BY created_at DESC", (err5, emails) => {
            stats.early_access_list = emails;
            res.json(stats);
          });
        });
      });
    });
  });
});

app.post('/api/admin/create-admin', requireAdmin, (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hash = hashPassword(password);
  db.run('INSERT OR REPLACE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name || 'Admin'], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to create admin' });
    res.json({ success: true, message: 'Admin account created' });
  });
});

app.get('/api/admin/export/users', requireAdmin, (req, res) => {
  db.all("SELECT email, name, created_at FROM users ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    let csv = 'Email,Name,Registered At\n';
    rows.forEach(r => { csv += `"${r.email || ''}","${r.name || ''}","${r.created_at}"\n`; });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=plantglow-users.csv');
    res.send(csv);
  });
});

app.get('/api/admin/export/emails', requireAdmin, (req, res) => {
  db.all("SELECT email, created_at FROM early_access_emails ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    let csv = 'Email,Signed Up At\n';
    rows.forEach(r => { csv += `"${r.email}","${r.created_at}"\n`; });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=plantglow-early-access.csv');
    res.send(csv);
  });
});

// ─── Start Server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 PlantGlow backend running at http://localhost:${PORT}`);
  console.log(`📱 Frontend at http://localhost:${PORT}/index.html`);
  console.log(`🔐 Admin at http://localhost:${PORT}/admin.html\n`);
});