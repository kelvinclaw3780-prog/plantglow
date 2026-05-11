const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Look for 'OK' text in a button-like context
let idx = c.indexOf("'OK'");
if (idx !== -1) console.log("Found 'OK' at", idx, JSON.stringify(c.substring(idx - 50, idx + 50)));

// Also check for close button in plant modal
const closeBtn = c.indexOf('closePlantModal');
if (closeBtn !== -1) console.log('\nclosePlantModal at', closeBtn, JSON.stringify(c.substring(closeBtn - 30, closeBtn + 100)));

// Check for any button with text 'Ok'
const okBtn = c.indexOf('>Ok</button>');
if (okBtn !== -1) console.log('\nFound >Ok</button> at', okBtn);

const okBtn2 = c.indexOf('>OK</button>');
if (okBtn2 !== -1) console.log('\nFound >OK</button> at', okBtn2);