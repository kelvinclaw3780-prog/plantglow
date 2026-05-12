const https = require('https');
// Check what routes are available by testing a known endpoint
const endpoints = [
  '/api/auth/check-email',
  '/api/auth/register',
  '/api/auth/login',
  '/api/plants'
];
let idx = 0;
function test() {
  if (idx >= endpoints.length) return;
  const path = endpoints[idx];
  const req = https.request({ hostname: 'plantglow-production.up.railway.app', path, method: 'GET' }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(path, '->', res.statusCode);
      idx++;
      test();
    });
  });
  req.on('error', err => { console.log(path, '-> Error:', err.message); idx++; test(); });
  req.end();
}
test();