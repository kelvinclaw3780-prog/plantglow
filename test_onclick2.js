// Test the correct way
const test1 = '<button onclick="handleToggleSave(\'' + id + '\')" class="test">';
console.log('Test 1:', test1);

// What we need in the HTML file's JS string:
// '<button onclick="handleToggleSave(\'' + id + '\')"'
// In Node.js notation (single-quoted source):
const correct = '<button onclick="handleToggleSave(\\\'\\\' + id + \\\'\\\')"';
console.log('Correct:', correct);

// Evaluate the JS string to see what it produces
const result = eval("'" + correct + "'");
console.log('Result:', result);

// What about with double quotes for the onclick attribute?
const test2 = "<button onclick=\"handleToggleSave('' + id + '')\">";
console.log('\nTest 2 (double q attr):', test2);

// What if I just use double quotes in the onclick attr AND single quotes in JS onclick?
// This SHOULD work because double quotes don't need escaping in single-quoted JS strings
const test3 = "<button onclick=\"handleToggleSave('' + id + '')\">";
const result3 = eval("'" + test3 + "'");
console.log('Result 3:', result3);

// Wait - can we just use double quotes for the onclick attribute inside single-quoted JS string?
// YES! In a single-quoted JS string, double quotes don't need escaping
// So: '<div onclick="func('' + x + '')">' 
// But '' still terminates early because it's TWO single quotes
// What about: '<div onclick="func(\'\' + x + \'\')">' -- still wrong

// What actually works:
const works = '<button onclick="handleToggleSave(\'\' + id + \'\');">';
console.log('\nWorks?:', works);
try { console.log('Result:', eval("'" + works + "'")); } catch(e) { console.log('Error:', e.message); }

// The RIGHT way to encode onclick with '' inside:
const rightWay = '<button onclick="handleToggleSave(\\\'\\\' + id + \\\'\\\')">';
console.log('\nRight way (escaped):', rightWay);
try { console.log('Result:', eval("'" + rightWay + "'")); } catch(e) { console.log('Error:', e.message); }