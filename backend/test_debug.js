const https = require('https');
const options = {
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/auth/forgot-password',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
};
const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers));
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Body:', body));
});
req.on('error', err => console.error('Error:', err.message));
req.end();