const {Database} = require('sqlite3');
const db = new Database('./plantglow.db');

// Create new table with correct schema
db.exec(`
  CREATE TABLE users_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    google_id TEXT UNIQUE,
    name TEXT,
    phone TEXT,
    verified INTEGER DEFAULT 0,
    subscribed INTEGER DEFAULT 0,
    subscribed_at TEXT,
    token TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  
  INSERT INTO users_new (id, phone, verified, subscribed, subscribed_at, created_at)
  SELECT id, phone, verified, subscribed, subscribed_at, created_at FROM users;
  
  DROP TABLE users;
  
  ALTER TABLE users_new RENAME TO users;
`, function(err) {
  if (err) console.log('Error:', err.message);
  else console.log('Table recreated successfully');
  process.exit(0);
});