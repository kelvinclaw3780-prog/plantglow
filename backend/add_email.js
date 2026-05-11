const {Database} = require('sqlite3');
const db = new Database('./plantglow.db');

db.run("ALTER TABLE users ADD COLUMN email TEXT UNIQUE", function(err) {
  if (err) console.log('Error:', err.message);
  else console.log('Added email column');
  process.exit(0);
});