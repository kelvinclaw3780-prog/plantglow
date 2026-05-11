const fs = require('fs');
let html = fs.readFileSync('login.html', 'utf8');

// Replace fetch('/api/ with fetch(`${BASE_URL}/api/
html = html.replace(/fetch\('\.\.\/api\//g, `fetch(\`\${BASE_URL}\/api\/`);
html = html.replace(/fetch\('\/api\//g, `fetch(\`\${BASE_URL}\/api\/`);

fs.writeFileSync('login.html', html);
console.log('Done');
