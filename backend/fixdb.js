const sqlite3 = require('sqlite3');
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'plantglow.db'));

db.run('DROP TABLE IF EXISTS verification_codes', () => {
  db.run(`CREATE TABLE verification_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    attempts INTEGER DEFAULT 0,
    type TEXT DEFAULT 'register',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`, () => {
    console.log('Fixed!');
    db.close();
    process.exit(0);
  });
});