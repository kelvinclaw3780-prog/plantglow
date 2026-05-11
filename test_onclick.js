// Test what the onclick actually produces
const testStr = '<button onclick="handleToggleSave(\'\' + id + \'\')" class="test">Click</button>';
console.log('Test HTML string:', testStr);

// Simulate what JS engine would see
const jsString = '<button onclick="handleToggleSave(\'\' + id + \'\')" class="test">';
console.log('\nJS string:', jsString);

// Evaluate to see what it produces
try {
  const result = eval("'" + jsString + "'");
  console.log('\nResult:', result);
} catch(e) {
  console.log('\nError:', e.message);
}

// What about using double quotes in the onclick attribute?
const testStr2 = "<button onclick=\"handleToggleSave('' + id + '')\" class=\"test\">Click</button>";
console.log('\n\nTest 2 (double quotes attr):', testStr2);