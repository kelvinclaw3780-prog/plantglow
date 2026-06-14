const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix 1: Login / Register in mobile nav (appears in both desktop and mobile)
// The text appears inside an inline style tag as: >Login / Register</a>
h = h.split('>Login / Register</a>').join('>登入 / 註冊</a>');

// Fix 2: Cookie banner - Accept and Decline
// But we need to be careful not to break JS function names handleAccept and handleDecline
// These appear in onclick attributes, not as button text
// Let me check the context of Accept and Decline in cookie banner
const acceptIdx = h.indexOf('>Accept</button>');
const declineIdx = h.indexOf('>Decline</button>');
console.log('Accept button at:', acceptIdx);
console.log('Decline button at:', declineIdx);

if (acceptIdx >= 0) {
  console.log('Accept context:', JSON.stringify(h.substring(acceptIdx - 40, acceptIdx + 40)));
}
if (declineIdx >= 0) {
  console.log('Decline context:', JSON.stringify(h.substring(declineIdx - 40, declineIdx + 40)));
}

// Check if Accept/Decline appear in JS function names (they shouldn't since we fixed those)
console.log('handleAccept in file?', h.includes('handleAccept'));
console.log('handleDecline in file?', h.includes('handleDecline'));

// Now fix Accept and Decline buttons (safe since they appear as button text, not in JS names)
if (acceptIdx >= 0) {
  h = h.split('>Accept</button>').join('>接受</button>');
}
if (declineIdx >= 0) {
  h = h.split('>Decline</button>').join('>拒絕</button>');
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('\nFixes applied');

// Verify
console.log('Has 登入 / 註冊?', h.includes('>登入 / 註冊</a>'));
console.log('Has >接受</button>?', h.includes('>接受</button>'));
console.log('Has >拒絕</button>?', h.includes('>拒絕</button>'));
console.log('Has handleAccept?', h.includes('handleAccept'));
console.log('Has handleDecline?', h.includes('handleDecline'));
console.log('Has Login / Register?', h.includes('Login / Register'));