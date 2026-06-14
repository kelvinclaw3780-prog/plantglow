const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

const loginIdx = h.indexOf('id="login-required-modal"');
console.log('LOGIN MODAL AREA:');
console.log(h.substring(loginIdx, loginIdx + 800));