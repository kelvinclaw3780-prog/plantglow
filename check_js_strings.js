const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the second script content (main JS)
const s1End = c.indexOf('</script>');
const s2Start = c.indexOf('<script>', s1End) + 8;
const s2End = c.indexOf('</script>', s2Start);
const mainJS = c.substring(s2Start, s2End);

// Check if </script> appears inside the JS
const scriptInJs = mainJS.indexOf('</script>');
if (scriptInJs !== -1) {
  console.log('</script> found in JS at position:', scriptInJs);
  console.log('Context:', JSON.stringify(mainJS.substring(scriptInJs - 50, scriptInJs + 50)));
} else {
  console.log('No </script> in JS');
}

// Check for unclosed strings in main JS
const stringParts = mainJS.split("'");
console.log('\nString quote count:', stringParts.length);
console.log('Odd segments (unclosed strings):');
for (let i = 0; i < stringParts.length; i++) {
  if (i % 2 === 1) { // Odd index = content inside quotes
    if (stringParts[i].includes('\n')) {
      console.log(`  Part ${i}: ${JSON.stringify(stringParts[i].substring(0, 50))}...`);
    }
  }
}