const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Split by <script> and analyze each part
const parts = c.split('<script>');
console.log('Total parts after split:', parts.length);

parts.forEach((p, i) => {
  const firstClose = p.indexOf('</script>');
  if (firstClose === -1) {
    console.log(`Part ${i}: No closing tag, length ${p.length}`);
    console.log(`  Content: ${p.substring(0, 80).replace(/\n/g, ' ')}`);
  } else {
    console.log(`Part ${i}: First </script> at ${firstClose}, length ${p.length}`);
    console.log(`  Content: ${p.substring(0, 80).replace(/\n/g, ' ')}`);
  }
});