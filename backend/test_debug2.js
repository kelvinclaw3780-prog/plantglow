const https = require('https');
const options = {
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/auth/forgot-password',
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Forwarded-Host': 'plantglow-production.up.railway.app'
  }
};
const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
});
req.on('error', err => console.error('Error:', err.message));
req.end();