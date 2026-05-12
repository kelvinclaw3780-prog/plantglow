const { createClient } = require('@libsql/client');
const client = createClient({
  url: 'libsql://plantglow-kelvinclaw3780-prog.aws-ap-northeast-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzg1NTYwMzEsImlkIjoiMDE5ZTFhMzItYTQwMS03ZjQ1LTg1Y2EtNWYwZDAyNWI3NWQ1IiwicmlkIjoiMDg0NTcxY2YtZmEyOS00ZDcyLTlkMWEtODBlZGNlZmVlZDQzIn0.bUU8V207GHIdCZFVLGX0a2WAkT4dLSBNX7J3AY2QmSCnnvgRZFXS-oMbHQH0vDE8sH3OMl6esxGdl43fnNZYBg'
});
(async () => {
  try {
    const r = await client.execute({ sql: 'SELECT name FROM sqlite_master WHERE type=? AND name=?', args: ['table', 'password_reset_codes'] });
    console.log('password_reset_codes exists:', r.rows.length > 0);
    const r2 = await client.execute({ sql: 'SELECT name FROM sqlite_master WHERE type=?', args: ['table'] });
    console.log('All tables:', r2.rows.map(row => row.name));
  } catch (err) {
    console.error('Error:', err.message);
  }
})();