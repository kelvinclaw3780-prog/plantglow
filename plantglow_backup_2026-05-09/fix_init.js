const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = h.lastIndexOf('<script>');
const scriptClose = h.indexOf('</script>', lastScript + 9);
const before = h.substring(0, lastScript + 9);
const scriptContent = h.substring(lastScript + 9, scriptClose);
const after = h.substring(scriptClose + 9);

const lines = scriptContent.split('\n');
console.log('Script lines:', lines.length);
console.log('Line 0:', JSON.stringify(lines[0]));
console.log('Line 1:', JSON.stringify(lines[1]));
console.log('Line 2:', JSON.stringify(lines[2]));
console.log('Line 3:', JSON.stringify(lines[3]));
console.log('Line 4:', JSON.stringify(lines[4]));
console.log('Line 5:', JSON.stringify(lines[5]));
console.log('Line 6:', JSON.stringify(lines[6]));
console.log('Line 7:', JSON.stringify(lines[7]));

// Build new init block wrapped in DOMContentLoaded
const newInit = `    // ============================================================
    // INIT (wrapped in DOMContentLoaded to ensure plantData is defined first)
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
      lucide.createIcons();
      updateNav();
      showLoginToast();
      renderPlants();
    });`;

// Build new script: newInit + lines from 8 onwards
const newLines = [newInit];
for (let i = 8; i < lines.length; i++) {
  newLines.push(lines[i]);
}

const newScriptContent = newLines.join('\n');
console.log('\nNew script length:', newScriptContent.length);
console.log('New script first 200:', JSON.stringify(newScriptContent.substring(0, 200)));
console.log('New script last 100:', JSON.stringify(newScriptContent.substring(newScriptContent.length - 100)));

const newHtml = before + newScriptContent + after;
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', newHtml, 'utf8');
console.log('\nSaved! New HTML length:', newHtml.length);