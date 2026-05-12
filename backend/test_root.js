const https = require('https');
// Try root and some known paths to understand what's running
const paths = ['/', '/api', '/api/auth/register', '/favicon.ico'];
let i = 0;
function test() {
  if (i >= paths.length) return;
  const p = paths[i];
  const req = https.request({ hostname: 'plantglow-production.up.railway.app', path: p, method: 'GET' }, res => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => { console.log(p, '->', res.statusCode, b.substring(0, 100)); i++; test(); });
  });
  req.on('error', e => { console.log(p, '-> Error:', e.message); i++; test(); });
  req.end();
}
test();