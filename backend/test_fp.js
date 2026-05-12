const https = require('https');
const data = JSON.stringify({ email: 'test@test.com' });
const options = {
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/auth/forgot-password',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
};
const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
});
req.on('error', err => console.error('Error:', err.message));
req.write(data);
req.end();