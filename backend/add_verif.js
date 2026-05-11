const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./plantglow.db');
db.run(`CREATE TABLE IF NOT EXISTS verification_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) console.log('Create error:', err.message);
  else console.log('verification_codes table ready');
  process.exit(0);
});