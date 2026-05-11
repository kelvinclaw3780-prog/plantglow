const fs = require('fs');
let h = fs.readFileSync('admin-dashboard.html', 'utf8');

h = h.replace(/fetch\('\.\.\/api\//g, `fetch(\`\${window.BASE_URL}\/api\/`);
h = h.replace(/fetch\('\/api\//g, `fetch(\`\${window.BASE_URL}\/api\/`);
h = h.replace(/window\.location\.href='\/api\//g, `window.location.href=\`\${window.BASE_URL}\/api\/`);

fs.writeFileSync('admin-dashboard.html', h);
console.log('Done');
