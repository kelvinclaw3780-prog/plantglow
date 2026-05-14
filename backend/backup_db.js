const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '..', 'backup_' + new Date().toISOString().slice(0, 10));

// Create backup folder
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const dbUrl = process.env.TURSO_DATABASE_URL || 'libsql://plantglow-kelvinclaw3780-prog.aws-ap-northeast-1.turso.io';
const dbAuthToken = process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzg1NTYwMzEsImlkIjoiMDE5ZTFhMzItYTQwMS03ZjQ1LTg1Y2EtNWYwZDAyNWI3NWQ1IiwicmlkIjoiMDg0NTcxY2YtZmEyOS00ZDcyLTlkMWEtODBlZGNlZmVlZDQzIn0.bUU8V207GHIdCZFVLGX0a2WAkT4dLSBNX7J3AY2QmSCnnvgRZFXS-oMbHQH0vDE8sH3OMl6esxGdl43fnNZYBg';

const db = createClient({ url: dbUrl, authToken: dbAuthToken });

async function backup() {
  console.log('📦 Backing up Turso database...');
  
  const tables = ['users', 'admin_users', 'admin_sessions', 'early_access_emails', 'verification_codes', 'password_reset_codes'];
  
  for (const table of tables) {
    try {
      const result = await db.execute('SELECT * FROM ' + table);
      const cols = result.columns;
      const rows = result.rows.map(row => {
        const obj = {};
        cols.forEach((c, i) => { obj[c] = row[i]; });
        return obj;
      });
      fs.writeFileSync(path.join(backupDir, table + '.json'), JSON.stringify(rows, null, 2));
      console.log('  ✅ ' + table + ' (' + rows.length + ' rows)');
    } catch (err) {
      console.log('  ⚠️ ' + table + ': ' + err.message);
    }
  }
  
  console.log('\n📁 Database backup complete: ' + backupDir);
}

backup().catch(console.error);