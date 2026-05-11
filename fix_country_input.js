const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Fix country code input - add input filtering and proper styling
const oldCountryCode = `<input type="tel" id="country-code" placeholder="+852" maxlength="4" value="+852"
          class="flex-shrink-0 w-20 px-3 py-3 bg-gray-100 rounded-xl text-gray-600 text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-forest-400 text-center">`;

const newCountryCode = `<input type="tel" id="country-code" placeholder="+852" maxlength="5" value="+852"
          class="flex-shrink-0 w-20 px-3 py-3 bg-gray-100 rounded-xl text-gray-900 text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 text-center"
          oninput="this.value = this.value.replace(/[^0-9+]/g, '').replace(/(?!^)\+/g, '');"
          onclick="this.setSelectionRange(0, this.value.length)">`;

if (c.includes(oldCountryCode)) {
  c = c.replace(oldCountryCode, newCountryCode);
  console.log('Fixed country code input');
} else {
  console.log('Could not find exact country code input');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', c, 'utf8');
console.log('Done');