const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File size:', c.length);
console.log('Scripts:', (c.match(/<script>/g) || []).length, 'open,', (c.match(/<\/script>/g) || []).length, 'close');

// Check script 1 (tailwind config)
const s1Start = c.indexOf('<script>') + 8;
const s1End = c.indexOf('</script>', s1Start);
const script1 = c.substring(s1Start, s1End);
console.log('\nScript 1 (tailwind):', script1.length, 'chars');
try { new Function(script1); console.log('Script 1: OK'); } catch(e) { console.log('Script 1 ERROR:', e.message); }

// Check script 2 (main JS)
const s2Start = c.indexOf('<script>', s1End) + 8;
const s2End = c.indexOf('</script>', s2Start);
const script2 = c.substring(s2Start, s2End);
console.log('\nScript 2 (main):', script2.length, 'chars');
try { new Function(script2); console.log('Script 2: OK'); } catch(e) { console.log('Script 2 ERROR:', e.message); }

// Check if there's a 3rd script
const s3Start = c.indexOf('<script>', s2End);
if (s3Start !== -1) {
  const s3End = c.indexOf('</script>', s3Start);
  const script3 = c.substring(s3Start + 8, s3End);
  console.log('\nScript 3:', script3.length, 'chars');
  console.log('Content starts:', script3.substring(0, 50).replace(/\n/g, ' '));
  console.log('Content ends:', script3.substring(script3.length - 50).replace(/\n/g, ' '));
}