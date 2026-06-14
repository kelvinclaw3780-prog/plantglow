const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix "Chat with us" in login modal
h = h.split('>Chat with us<').join('>透過 WhatsApp 聊天<');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed Chat with us');
console.log('Has Chat with us?', h.includes('>Chat with us<'));
console.log('Has 透過 WhatsApp 聊天?', h.includes('>透過 WhatsApp 聊天<'));