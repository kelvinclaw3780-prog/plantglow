const https = require('https');
https.get('https://plantglow-production.up.railway.app/', (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Body length:', body.length, 'Contains server.js:', body.includes('server.js') || body.includes('Express')));
}).on('error', err => console.error('Error:', err.message));