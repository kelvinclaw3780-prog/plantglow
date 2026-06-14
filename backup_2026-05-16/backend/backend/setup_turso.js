const { createClient } = require('@libsql/client');
const crypto = require('crypto');
const db = createClient({ url: 'libsql://plantglow-kelvinclaw3780-prog.aws-ap-northeast-1.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzg1NTYwMzEsImlkIjoiMDE5ZTFhMzItYTQwMS03ZjQ1LTg1Y2EtNWYwZDAyNWI3NWQ1IiwicmlkIjoiMDg0NTcxY2YtZmEyOS00ZDcyLTlkMWEtODBlZGNlZmVlZDQzIn0.bUU8V207GHIdCZFVLGX0a2WAkT4dLSBNX7J3AY2QmSCnnvgRZFXS-oMbHQH0vDE8sH3OMl6esxGdl43fnNZYBg' });
async function init() {
  console.log('Creating tables...');
  await db.executeMultiple(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password_hash TEXT, google_id TEXT UNIQUE, name TEXT, token TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  await db.executeMultiple(`CREATE TABLE IF NOT EXISTS admin_users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, name TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  await db.executeMultiple(`CREATE TABLE IF NOT EXISTS admin_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, admin_id INTEGER NOT NULL, token TEXT UNIQUE NOT NULL, expires_at TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  await db.executeMultiple(`CREATE TABLE IF NOT EXISTS early_access_emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  await db.executeMultiple(`CREATE TABLE IF NOT EXISTS verification_codes (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, code TEXT NOT NULL, expires_at TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  console.log('Tables created!');
  const hash = crypto.createHash('sha256').update('plantglow123').digest('hex');
  await db.execute({ sql: 'INSERT OR REPLACE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)', args: ['admin@plantglow.com', hash, 'Test Admin'] });
  console.log('Admin created!');
  const r = await db.execute({ sql: 'SELECT * FROM admin_users' });
  console.log('Admins:', r.rows);
}
init().catch(console.error);
