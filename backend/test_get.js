const https = require('https');
// Test GET endpoint first (not POST)
const req = https.request({
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/auth/check-email?email=admin@plantglow.com',
  method: 'GET',
  headers: { 'Accept': 'application/json' }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', body);
  });
});
req.on('error', err => console.error('Error:', err.message));
req.end();