const https = require('https');
// Test forgot-password specifically
const data = JSON.stringify({ email: 'admin@plantglow.com' });
const req = https.request({
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/auth/forgot-password',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://plantglow.vercel.app'
  }
}, (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Body:', body);
    // Try parse
    try { console.log('JSON:', JSON.parse(body)); } catch(e) {}
  });
});
req.on('error', e => console.log('Error:', e.message));
req.write(data);
req.end();