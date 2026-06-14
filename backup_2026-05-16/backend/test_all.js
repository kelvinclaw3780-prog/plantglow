const https = require('https');
const paths = [
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/login',
  '/api/auth/register',
  '/api/plants',
  '/'
];
let i = 0;
function test() {
  if (i >= paths.length) return;
  const p = paths[i];
  const req = https.request({ hostname: 'plantglow-production.up.railway.app', path: p, method: 'GET' }, res => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => { console.log(p, '->', res.statusCode); i++; test(); });
  });
  req.on('error', e => { console.log(p, '-> Error:', e.message); i++; test(); });
  req.end();
}
test();