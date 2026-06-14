const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix Close button in mobile menu
h = h.split('>Close</button>').join('>關閉</button>');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed Close button');
console.log('Has Close?', h.includes('>Close</button>'));
console.log('Has 關閉?', h.includes('>關閉</button>'));