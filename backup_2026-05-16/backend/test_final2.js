const https = require('https');
const tests = [
  { method: 'GET', path: '/api/auth/login' },
  { method: 'POST', path: '/api/auth/forgot-password', body: { email: 'admin@plantglow.com' } },
  { method: 'POST', path: '/api/auth/reset-password', body: { email: 'admin@test.com', code: '123456', password: 'password123' } },
  { method: 'POST', path: '/api/early-access', body: { email: 'test@example.com' } },
  { method: 'GET', path: '/api/plants' },
];
let i = 0;
function test() {
  if (i >= tests.length) return;
  const t = tests[i];
  const bodyStr = t.body ? JSON.stringify(t.body) : '';
  const req = https.request({
    hostname: 'plantglow-production.up.railway.app',
    path: t.path,
    method: t.method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {})
    }
  }, (res) => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => {
      const status = res.statusCode;
      const preview = b.length > 100 ? b.substring(0, 100) : b;
      console.log(`${status} ${t.method} ${t.path} -> ${preview}`);
      i++;
      test();
    });
  });
  req.on('error', e => { console.log(`ERR ${t.method} ${t.path} -> ${e.message}`); i++; test(); });
  if (bodyStr) req.write(bodyStr);
  req.end();
}
test();