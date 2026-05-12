const https = require('https');
const req = https.request({
  hostname: 'plantglow-production.up.railway.app',
  path: '/api/auth/forgot-password',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body length:', body.length);
    console.log('Body preview:', body.substring(0, 200));
    // Try to parse as JSON
    try {
      const json = JSON.parse(body);
      console.log('JSON:', JSON.stringify(json));
    } catch (e) {
      console.log('Not JSON, raw HTML error page');
    }
  });
});
req.on('error', err => console.error('Error:', err.message));
req.write('{\"email\":\"admin@plantglow.com\"}');
req.end();