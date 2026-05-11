const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const path = require('path');

const dbPath = path.join(__dirname, 'plantglow.db');
const db = new sqlite3.Database(dbPath);

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

db.serialize(() => {
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

  const email = 'admin@plantglow.com';
  const password = 'plantglow123';
  const name = 'Test Admin';
  const hash = hashPassword(password);

  db.run('INSERT OR REPLACE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name], function(err) {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Test admin created!');
      console.log('Email: admin@plantglow.com');
      console.log('Password: plantglow123');
    }
    db.close();
  });
});