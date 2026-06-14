const initSqlJs = require('sql.js');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

async function main() {
  const SQL = await initSqlJs();
  const dbPath = path.join(__dirname, 'plantglow.db');
  
  let db;
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

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
  const hash = crypto.createHash('sha256').update(password).digest('hex');

  db.run('INSERT OR REPLACE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name]);

  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));

  console.log('Test admin created!');
  console.log('Email:', email);
  console.log('Password:', password);

  db.close();
}

main();
