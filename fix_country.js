const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Remove all orphan option tags that are left over from the broken edit
// Find the country code section
const startIdx = c.indexOf('<input type="tel" id="country-code"');
const endIdx = c.indexOf('</select>', startIdx) + 9; // include </select> tag

if (startIdx !== -1 && endIdx !== -1) {
  // Get everything before and after
  const before = c.substring(0, startIdx);
  const after = c.substring(endIdx);
  
  // Find the end of the input line
  const inputEnd = c.indexOf('>', startIdx);
  const cleanInput = c.substring(startIdx, inputEnd + 1);
  
  // Check if the input is clean (no option tags after it)
  console.log('Input tag:', cleanInput.substring(0, 100));
  
  // Remove trailing options and closing select by finding the next element
  const nextDivIdx = after.indexOf('<input type="tel" id="phone-input"');
  console.log('Next phone input at:', nextDivIdx);
  
  // Just keep the before part and the clean input + part of after
  // We need to reconstruct properly
  const inputLine = `<input type=\"tel\" id=\"country-code\" placeholder=\"+852\" maxlength=\"4\" value=\"+852\"
           class=\"flex-shrink-0 w-20 px-3 py-3 bg-gray-100 rounded-xl text-gray-600 text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-forest-400 text-center\">`;
  
  // Find where the phone-input starts
  const phoneIdx = c.indexOf('<input type="tel" id="phone-input"');
  const beforePhone = c.substring(0, phoneIdx);
  const fromPhone = c.substring(phoneIdx);
  
  // Reconstruct without the select/options
  c = beforePhone + '\n        ' + inputLine + '\n        ' + fromPhone;
  
  console.log('Cleaned up. Length:', c.length);
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', c, 'utf8');
console.log('Done');