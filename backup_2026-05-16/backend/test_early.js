const https = require('https');
// Test early-access endpoint (EXISTS since beginning)
const data = JSON.stringify({ email: 'test@example.com' });
const req = https.request({
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/early-access',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
}, (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Body:', body));
});
req.on('error', e => console.log('Error:', e.message));
req.write(data);
req.end();