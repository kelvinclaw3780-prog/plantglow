const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// The problem: we need to have \\\' in the file to get \' in the final onclick attribute
// Current: \' (2 chars: backslash + quote) → evaluates to ' → src=' breaks JS string
// Needed: \\\' (4 chars: \\\' in source) → evaluates to \' (2 chars: backslash + quote in string)

// Fix all onerror src= patterns
// Current (wrong): onerror="this.src=\'
// Correct (4 backslashes): onerror="this.src=\\\\
let count = 0;
let pos = 0;
while ((pos = c.indexOf("onerror=\"this.src=\\", pos)) !== -1) {
  console.log('Found at:', pos);
  console.log('Before:', JSON.stringify(c.substring(pos, pos + 30)));
  // Replace \' with \\\'
  c = c.replace("onerror=\"this.src=\\'", "onerror=\"this.src=\\\\\\'");
  count++;
  pos += 30;
}
console.log('Fixed', count, 'occurrences');

// Also check for the unescaped version
pos = 0;
while ((pos = c.indexOf("onerror=\"this.src='", pos)) !== -1) {
  console.log('Found unescaped at:', pos);
  c = c.replace("onerror=\"this.src='", "onerror=\"this.src=\\\\\\'");
  count++;
  pos += 20;
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done! Total fixed:', count);

// Verify
node -e "const fs=require('fs');const c=fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html','utf8');const idx=c.indexOf('onerror');console.log(JSON.stringify(c.substring(idx,idx+80)))" 2>&1