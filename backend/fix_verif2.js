const sqlite3 = require('sqlite3');
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'plantglow.db'));

db.serialize(() => {
  // Drop old table and recreate with email column
  db.run('DROP TABLE IF EXISTS verification_codes', (err) => {
    if (err) { console.log('Drop error:', err.message); process.exit(1); }
    console.log('Dropped old table');
    
    db.run(`CREATE TABLE verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      attempts INTEGER DEFAULT 0,
      type TEXT DEFAULT 'register',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`, (err2) => {
      if (err2) { console.log('Create error:', err2.message); process.exit(1); }
      console.log('Created new verification_codes table with email column');
      process.exit(0);
    });
  });
});