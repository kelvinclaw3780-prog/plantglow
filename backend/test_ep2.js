const https = require('https');
const endpoints = [
  ['GET', '/api/auth/login'],
  ['POST', '/api/auth/forgot-password'],
  ['POST', '/api/auth/reset-password'],
  ['POST', '/api/early-access'],
  ['GET', '/api/plants']
];
let i = 0;
function test() {
  if (i >= endpoints.length) return;
  const [method, path] = endpoints[i];
  const req = https.request({
    hostname: 'plantglow-production.up.railway.app',
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://plantglow.vercel.app'
    }
  }, (res) => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => { console.log(`${method} ${path} -> ${res.statusCode}`); i++; test(); });
  });
  req.on('error', e => { console.log(`${method} ${path} -> Error: ${e.message}`); i++; test(); });
  if (method === 'POST') req.write('{}');
  req.end();
}
test();