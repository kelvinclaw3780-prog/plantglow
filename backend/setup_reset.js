const { createClient } = require('@libsql/client');
const db = createClient({ url: 'libsql://plantglow-kelvinclaw3780-prog.aws-ap-northeast-1.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzg1NTYwMzEsImlkIjoiMDE5ZTFhMzItYTQwMS03ZjQ1LTg1Y2EtNWYwZDAyNWI3NWQ1IiwicmlkIjoiMDg0NTcxY2YtZmEyOS00ZDcyLTlkMWEtODBlZGNlZmVlZDQzIn0.bUU8V207GHIdCZFVLGX0a2WAkT4dLSBNX7J3AY2QmSCnnvgRZFXS-oMbHQH0vDE8sH3OMl6esxGdl43fnNZYBg' });
async function init() {
  await db.executeMultiple(`CREATE TABLE IF NOT EXISTS password_reset_codes (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, code TEXT NOT NULL, expires_at TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  console.log('password_reset_codes table created!');
}
init().catch(console.error);
