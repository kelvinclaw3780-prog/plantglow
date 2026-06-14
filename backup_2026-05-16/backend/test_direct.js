const https = require('https');
// Test the full Railway URL directly - no redirect
const req = https.request({
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/auth/forgot-password',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Body length:', res.headers['content-length']);
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Raw body:', body);
    try { console.log('Parsed:', JSON.parse(body)); } catch(e) {}
  });
});
req.on('error', e => console.log('Error:', e.message));
req.write(JSON.stringify({ email: 'admin@plantglow.com' }));
req.end();