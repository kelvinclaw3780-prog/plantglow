const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./plantglow.db');

db.exec(`
  DROP TABLE IF EXISTS verification_codes;
  CREATE TABLE verification_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    attempts INTEGER DEFAULT 0,
    type TEXT DEFAULT 'register',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`, (err) => {
  if (err) console.error('Error:', err.message);
  else console.log('verification_codes table recreated with email column');
  process.exit(0);
});