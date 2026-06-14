const https = require('https');
// Try direct IP bypass test
const http = require('http');

// First check: does the server respond at all on HTTP?
const httpReq = http.get('http://plantglow-production.up.railway.app/api/auth/login', (res) => {
  console.log('HTTP Status:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers).substring(0, 200));
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('HTTP Body:', body.substring(0, 100)));
}).on('error', e => console.log('HTTP Error:', e.message));

// Also try HTTPS with a direct JSON POST
const data = JSON.stringify({ email: 'admin@plantglow.com', password: 'wrong' });
const req = https.request({
  hostname: 'plantglow-production.up.railway.app',
  port: 443,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Origin': 'https://plantglow.vercel.app',
    'Referer': 'https://plantglow.vercel.app/'
  }
}, (res) => {
  console.log('\nHTTPS Status:', res.statusCode);
  console.log('HTTPS Headers:', JSON.stringify(res.headers).substring(0, 300));
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('HTTPS Body:', body.substring(0, 200)));
});
req.on('error', e => console.log('HTTPS Error:', e.message));
req.write(data);
req.end();