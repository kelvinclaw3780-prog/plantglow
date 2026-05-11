const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Find logo in login page
const patterns = ['login-logo', 'logo', 'kelvin_logo', 'plantglow-logo', 'class="w-', 'class="h-'];
patterns.forEach(function(p) {
  const idx = c.indexOf(p);
  if (idx !== -1) console.log(p, 'at:', idx, ':', JSON.stringify(c.substring(idx - 50, idx + 200)));
});