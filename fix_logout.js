const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix Logout buttons
// Desktop nav logout
h = h.split('>Logout</span>').join('>登出</span>');
// Mobile nav logout
h = h.split('>Logout</button>').join('>登出</button>');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed Logout buttons');
console.log('Has >Logout</span>?', h.includes('>Logout</span>'));
console.log('Has >登出</span>?', h.includes('>登出</span>'));
console.log('Has >Logout</button>?', h.includes('>Logout</button>'));
console.log('Has >登出</button>?', h.includes('>登出</button>'));