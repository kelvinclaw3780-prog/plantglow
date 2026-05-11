const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all <script> tags and their content
let pos = 0;
let scriptIdx = 0;
while (pos < c.length) {
  const openIdx = c.indexOf('<script>', pos);
  const closeIdx = c.indexOf('</script>', pos);
  
  if (openIdx === -1 && closeIdx === -1) break;
  
  if (openIdx !== -1 && (closeIdx === -1 || openIdx < closeIdx)) {
    // It's an open tag
    const content = c.substring(openIdx + 8, c.indexOf('</script>', openIdx + 8));
    console.log(`\n=== SCRIPT ${scriptIdx} (OPEN at ${openIdx}) ===`);
    console.log('Content length:', content.length);
    console.log('Content (first 100):', content.substring(0, 100).replace(/\n/g, ' '));
    console.log('Content (last 100):', content.substring(content.length - 100).replace(/\n/g, ' '));
    
    // Check for any </script> inside this script's content
    const innerClose = content.indexOf('</script>');
    if (innerClose !== -1) {
      console.log('*** PROBLEM: </script> found INSIDE this script at offset', innerClose);
      console.log('Context:', JSON.stringify(content.substring(innerClose - 50, innerClose + 50)));
    }
    
    pos = openIdx + 8;
    scriptIdx++;
  } else {
    // It's a close tag with no preceding open - this shouldn't happen in valid HTML
    console.log(`\n!!! ORPHAN CLOSE at ${closeIdx} !!!`);
    console.log('Context:', JSON.stringify(c.substring(closeIdx - 20, closeIdx + 40)));
    pos = closeIdx + 9;
  }
}