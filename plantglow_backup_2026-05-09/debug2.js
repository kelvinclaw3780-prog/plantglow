const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check structure
const tailwindEnd = html.indexOf('</script>', html.indexOf('tailwind.config'));
const lucideEnd = html.indexOf('</script>', tailwindEnd + 1);
const lastScriptIdx = html.lastIndexOf('<script>');
const lastScriptCloseIdx = html.indexOf('</script>', lastScriptIdx + 9);

console.log('File length:', html.length);
console.log('Tailwind config end:', tailwindEnd);
console.log('Lucide CDN end:', lucideEnd);
console.log('Last script open:', lastScriptIdx);
console.log('Last script close:', lastScriptCloseIdx);
console.log('');
console.log('Chars just before last script open:', JSON.stringify(html.substring(lastScriptIdx - 20, lastScriptIdx)));
console.log('Chars at last script open:', JSON.stringify(html.substring(lastScriptIdx, lastScriptIdx + 20)));
console.log('Chars just before last script close:', JSON.stringify(html.substring(lastScriptCloseIdx - 30, lastScriptCloseIdx)));
console.log('Chars at last script close:', JSON.stringify(html.substring(lastScriptCloseIdx, lastScriptCloseIdx + 20)));
console.log('');
console.log('Last 300 chars:', JSON.stringify(html.substring(html.length - 300)));
