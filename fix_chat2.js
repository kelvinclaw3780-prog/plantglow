const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix "Chat with us" - it spans multiple lines
const oldText = 'Chat with us\n          </a>';
const newText = '透過 WhatsApp 聊天\n          </a>';

if (h.includes(oldText)) {
  h = h.split(oldText).join(newText);
  fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
  console.log('Fixed Chat with us');
} else {
  console.log('Pattern not found, trying alternative...');
  // Try with just the text part
  h = h.split('>Chat with us<').join('>透過 WhatsApp 聊天<');
  fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
  console.log('Fixed using alternative method');
  console.log('Has Chat with us?', h.includes('>Chat with us<'));
  console.log('Has 透過 WhatsApp 聊天?', h.includes('>透過 WhatsApp 聊天<'));
}