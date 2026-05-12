const https = require('https');
const options = { hostname: 'plantglow-production.up.railway.app', path: '/api/health', method: 'GET' };
const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
});
req.on('error', err => console.error('Error:', err.message));
req.end();